// This code creates a database model for storing admmin data in a database.

const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  access: { type: String },
});

const AdminModel = mongoose.model("Admin", Schema);
module.exports = AdminModel;
