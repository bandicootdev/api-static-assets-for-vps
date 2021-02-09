'use strict';
const dotenv = require('dotenv').config();
const tinify = require('tinify');
const fs = require('fs');
const path = require('path')

const PATH = path.join(__dirname, `../${process.env.PATHIMAGES}`)
console.log(PATH)
const TINIFY_KEY = process.env.TINIFY_KEY
tinify.key = TINIFY_KEY;

fs.readdir(PATH, (err, items) => {
  try {
    return new Promise((resolve, reject) => {
      items.map(img => {
        const pathFile = `${PATH}/${img}`;
        const source = tinify.fromFile(pathFile);
        source.toFile(pathFile).then(() => {
          resolve(true)
        }).catch(err => {
          reject(false)
        })
      })
    }).catch(err => {
      throw err
    })
  } catch (err) {
    console.log(err)
  }
})