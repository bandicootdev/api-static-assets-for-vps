const Image = require('../models/ImageModel')
const {TYPES} = require("../utils/constants");

module.exports.getListImages = async (req, res, next) => {
  try {
    const fullUrl = `${req.protocol}://${req.get('host')}`
    let images = await Image.find({}).catch(err => {
      throw err
    })
    images = images.reduce((acc, item) => {
      let names = [];
      item.images.forEach(itemImage => {
        names.push({
          project:item.project,
          url:`${fullUrl}/${itemImage}`,
          type:item.type
        })
      })
      return acc.concat(names)
    }, [])

    return res.status(200).json({ok:true,assets:images})
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports.uploadImagesController = async (req, res, next) => {
  try {
    if (req.files) {
      const {project, type} = req.body;
      if (!project || !type) {
        return res.status(400).json({ok: false, message: 'required fields'});
      }

      if (TYPES.find(el => el.toLowerCase() === type) === undefined) {
        console.log('entro en el invalid')
        return res.status(406).json({ok: false, message: 'invalid type for project'})
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

