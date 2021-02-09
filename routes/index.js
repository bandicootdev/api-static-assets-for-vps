const express = require('express')
const images = require('./images')
const maintenance = require('./maintenance')
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({})
})

app.use('/images', images)
app.use('/maintenance', maintenance);

module.exports = app;