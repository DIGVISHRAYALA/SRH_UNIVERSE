// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
    downloadCount: {
    type: Number,
    default: 0
  },
  lastEditedAt: {
  type: Date
}

});

module.exports = mongoose.model('Video', videoSchema);
