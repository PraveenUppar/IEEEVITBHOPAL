// This code creates a database model for storing Package data in a database.

const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: String,
  Date: String,
  Time: String,
  Tip: String,
  PickUp: String,
  Drop: String,
  Description: String,
});

const PackageModel = mongoose.model("Package", PackageSchema);

module.exports = PackageModel;
