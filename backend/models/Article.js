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








// const mongoose = require('mongoose');

// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   //imageUrl: { type: String }, // ✅ NEW: optional image field
//   uploadedAt: { type: Date, default: Date.now }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Article', articleSchema);



// const mongoose = require('mongoose');

// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   image: { type: String }, // store filename or URL
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Article', articleSchema);




// const mongoose = require('mongoose');

// const articleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   image: { type: String },
//   createdAt: { type: Date, default: Date.now },

//   // ✅ new fields
//   likes: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "User",
//     default: []
//   },
//  // store user IDs
//   comments: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         username: { type: String, required: false},
//     text: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   }]
// });

// module.exports = mongoose.model('Article', articleSchema);




const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  titleTelugu: { type: String },   // <--- NEW
  contentTelugu: { type: String }, // <--- NEW
  image: { type: String },
  createdAt: { type: Date, default: Date.now },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Article', articleSchema);
