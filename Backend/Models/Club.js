const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: String,
  Date: String,
  Time: String,
  Fees: String,
  Description: String,
});

const ClubModel = mongoose.model("Club", ClubSchema);

module.exports = ClubModel;
