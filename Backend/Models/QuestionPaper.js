const mongoose = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  FacultyName: String,
  Slot: String,
  Subject: String,
  Picture: String,
});

const QuestionPaperModel = mongoose.model("QuestionPaper", QuestionPaperSchema);

module.exports = QuestionPaperModel;
