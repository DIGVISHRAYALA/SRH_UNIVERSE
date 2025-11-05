// // models/Room.js
// const mongoose = require("mongoose");
// const roomSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Room", roomSchema);






const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Room", roomSchema);




