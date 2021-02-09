const express = require('express')
const images = require('./images')
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({})
})

app.use('/images', images)

module.exports = app;