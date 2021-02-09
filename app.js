require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const routes = require('./routes/index');
const captureError = require('./utils/serverError')
const app = express();

connectDB(
  process.env.URLDB,
  process.env.PORTDB,
  process.env.NAMEDB
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes)

app.use(captureError);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server on port ${process.env.PORT || 5000}`)
})