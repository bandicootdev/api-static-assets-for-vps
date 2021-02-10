const Image = require('../models/ImageModel')
const {TYPES} = require("../utils/constants");

module.exports.getListImages = async (req, res, next) => {

}

module.exports.uploadImagesController = async (req, res, next) => {
  try {
    if (req.files) {
      const {project, type} = req.body;
      if (!project || !type) {
        return res.status(400).json({ok: false, message: 'required fields'});
      }
      if (typeof TYPES.find(el=>el.toLowerCase() === type) === "undefined") {
        return res.status(406).json({ok: false, message: 'invalid type'})
      }
      let images = req.files.reduce((acc, img) => {
        return acc.concat(img.filename);
      }, [])
      const fileImage = new Image({
        project,
        type,
        images
      })
      await fileImage.save().catch(err => {
        throw err
      })
    } else {
      return res.status(400).json({ok: false, message: 'there are no images to upload'})
    }
    return res.status(200).json({ok: true, message: 'images uploaded successfully'})
  } catch (err) {
    next(err)
  }
}

