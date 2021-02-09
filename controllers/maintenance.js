const compressImage = require('../utils/optimizeImage');

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