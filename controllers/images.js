module.exports.getListImages = async (req, res, next) => {

}

module.exports.uploadImagesController = (req, res, next) => {
  try {
    console.log(req.files)
  } catch (err) {
    next(err)
  }
}

