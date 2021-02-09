const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  images: [String],
  project: {
    type: String
  },
  type: {
    type: String,
    default: null
  },
  date: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Image', ImageSchema);