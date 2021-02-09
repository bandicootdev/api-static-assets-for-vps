'use strict';
const dotenv = require('dotenv').config();
const tinify = require('tinify');
const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path')

const PATH = path.join(__dirname, `../${process.env.PATHIMAGES}`)
const TINIFY_KEY = process.env.TINIFY_KEY
tinify.key = TINIFY_KEY;

module.exports = async () => {
  return new Promise((resolve, reject) => {
    if (typeof TINIFY_KEY === "undefined") {
      reject(new Error('there is no tinify Api Key'))
    }
    fsPromise.readdir(PATH).then((items) => {
      const pathImages = [];
      items.map((img) => {
        const pathFile = `${PATH}/${img}`;
        const source = tinify.fromFile(pathFile);
        pathImages.push({
          path: pathFile,
          source
        })
        resolve(pathImages)
      })
    }).catch(err => {
      reject(err)
    })
  })
}