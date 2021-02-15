require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const forceSsl = require('express-force-ssl');
const connectDB = require('./config/connectDB');
const models = require('./models/index');
const routes = require('./routes/index');
const captureError = require('./utils/serverError');
const {deleteJunkFiles} = require("./controllers/maintenance");
const app = express();

connectDB(
  process.env.URLDB,
  process.env.PORTDB,
  process.env.NAMEDB
)
const certificate = {
  key: fs.readFileSync(process.env.NODE_ENV === 'prod' ? process.env.SSL_KEY_ROUTE : './certificates/old/private.key'),
  cert: fs.readFileSync(process.env.NODE_ENV === 'prod' ? process.env.SSL_CRT_ROUTE : './certificates/old/certificate.crt'),
  // ca: fs.readFileSync('./certificates/old/ca_bundle.crt')
};
app.use(forceSsl)
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/public/images`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes)

app.use(captureError);

cron.schedule('* * 23 * *', () => {
  try {
    deleteJunkFiles();
  } catch (err) {
    console.log(err)
  }
}, {
  timezone: "America/La_Paz"
});


if (process.env.NODE_ENV !== "prod") {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server on port ${process.env.PORT || 5000}`)
  })
} else {
  https.createServer(certificate, app).listen(process.env.PORT || 5000, () => {
    console.log(`server on port ${process.env.PORT || 5000}`)
  })
}