const express = require('express');
const {getListImages, uploadImagesController} = require("../controllers/images");
const {uploadImages} = require("../utils/uploadFIle");
const router = express.Router();

router.get('/', [getListImages])
router.post('/', [uploadImages, uploadImagesController])

module.exports = router;