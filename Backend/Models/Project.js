const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: String,
  StartDate: String,
  EndDate: String,
  TotalMembers: String,
  Topic: String,
  Description: String,
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
