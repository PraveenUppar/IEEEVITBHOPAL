const mongoose = require("mongoose");

const AlumniSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: String,
  Branch: String,
  Year: String,
  Contact: String,
  LinkedIn: String,
});

const AlumniModel = mongoose.model("Alumni", AlumniSchema);
module.exports = AlumniModel;
