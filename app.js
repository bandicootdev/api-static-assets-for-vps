require('dotenv').config();
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`server on port ${process.env.PORT || 5000}`)
})