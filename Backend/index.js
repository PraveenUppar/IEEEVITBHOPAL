const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect(
  "mongodb+srv://praveenuppar718:AEzmZXInlgBKWtP7@uni-help.owbnnyr.mongodb.net/?retryWrites=true&w=majority&appName=Uni-Help"
);

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
