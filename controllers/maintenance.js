const Image = require('../models/ImageModel')
const compressImage = require('../utils/optimizeImage');
const {scanDir} = require("../utils/uploadFIle");
const {removeImage} = require("../utils/uploadFIle");
const {fileExists} = require("../utils/uploadFIle");

module.exports.optimizeImages = async (req, res, next) => {
  try {
    let Promises = await compressImage().catch(err => {
      throw err
    });

    Promise.all(Promises.map((promise) => {
      promise.source.toFile(promise.path).catch(err => {
        throw err
      })
    })).catch(err => {
      throw err
    })
    res.status(200).json({
      ok: true,
      message: 'optimized images'
    })
  } catch (err) {
    next(err)
  }
}

module.exports.deleteJunkFiles = async (req, res, next) => {
  try {
    const uploadedImages = await scanDir();
    const images = await Image.find({}).catch(err => {
      throw err
    })
    const nameImages = images.reduce((acc, item) => {
      return acc.concat(item.images)
    }, []);
    uploadedImages.map(async (img) => {
      if (typeof nameImages.find(el => el === img) === "undefined") {
        if (fileExists(img)) {
          removeImage(img)
        }
      }
    })
    res.status(200).json({ok: true, message: 'cleaned folder'})
  } catch (err) {
    next(err)
  }
}