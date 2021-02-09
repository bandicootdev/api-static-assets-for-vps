const express = require('express');
const {optimizeImages} = require("../controllers/maintenance");
const router = express.Router();

router.get('/optimize-images', optimizeImages)

module.exports = router;