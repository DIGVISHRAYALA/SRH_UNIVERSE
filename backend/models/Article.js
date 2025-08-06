// models/Article.js
// const mongoose = require('mongoose');

// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//     uploadedAt: {
//     type: Date,
//     default: Date.now
//   },
//   content: { type: String, required: true }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Article', articleSchema);

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  //imageUrl: { type: String }, // ✅ NEW: optional image field
  uploadedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);

