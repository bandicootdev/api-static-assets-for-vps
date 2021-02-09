require('dotenv').config();
const express = require('express')
const routes = require('./routes/index')
const app = express();

app.use('/', routes)

app.listen(process.env.PORT || 5000, () => {
  console.log(`server on port ${process.env.PORT || 5000}`)
})