const express = require('express');
const {optimizeImages, deleteJunkFiles} = require("../controllers/maintenance");
const router = express.Router();

router.get('/optimize-images', optimizeImages);
router.get('/delete-junk-images', deleteJunkFiles);

module.exports = router;