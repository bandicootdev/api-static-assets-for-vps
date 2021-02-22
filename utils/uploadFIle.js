const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');

const configMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),
  limits: {fileSize: 2000000},
  fileFilter(req, file, cb) {
    console.log(file.mimetype === 'application/pdf')
    if (file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png'
      || file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Format invalid'))
    }
  },
}

const upload = multer(configMulter).array('image', 20);

module.exports.uploadImages = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error)
      return res.status(500).json({ok: false, message: error});
    }
    return next();
  })
}


module.exports.fileExists = (image) => {
  const pathFile = path.join(__dirname, `../public/images/${image}`);
  fsPromise.access(pathFile, fs.constants.F_OK).catch(err => {
    throw err
  })
  return true
};


module.exports.removeImage = (image) => {
  const pathFile = path.join(__dirname, `../public/images/${image}`);
  fsPromise.unlink(pathFile).catch(err => {
    throw err
  })
  return true;
};

module.exports.scanDir = () => {
  const pathFile = path.join(__dirname, `../public/images/`);
  return fsPromise.readdir(pathFile).catch(err => {
    throw err
  })
}
