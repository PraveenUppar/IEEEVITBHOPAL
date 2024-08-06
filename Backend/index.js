const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./Models/User.js");
const QuestionPaper = require("./Models/QuestionPaper.js");
const Project = require("./Models/Project.js");
const Package = require("./Models/Package.js");
const Club = require("./Models/Club.js");
const Alumni = require("./Models/Alumni.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:1234",
  })
);

mongoose.connect(
  "mongodb+srv://praveenuppar718:AEzmZXInlgBKWtP7@uni-help.owbnnyr.mongodb.net/?retryWrites=true&w=majority&appName=Uni-Help"
);

// Post request for registering users

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Post request for verifying user login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

// Post request for logout of the user

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// Get request for details for the user

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Post request for uploading question paper

app.post("questionpaper", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { FacultyName, Slot, Subject, Picture } = req.body;
    const postDoc = await QuestionPaper.create({
      FacultyName,
      Slot,
      Subject,
      Picture: newPath,
      owner: info.id,
    });
    res.json(postDoc);
  });
});

// Get request for Showing question paper

app.put("questionpaper", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { FacultyName, Slot, Subject, Picture } = req.body;
    const postDoc = await QuestionPaper.findById(id);
    const isOwner = JSON.stringify(postDoc.owner) === JSON.stringify(info.id);
    if (!isOwner) {
      return res.status(400).json("Did not find any Question Paper");
    }
    await postDoc.update({
      FacultyName,
      Slot,
      Subject,
      Picture: newPath ? newPath : postDoc.Picture,
    });
    res.json(postDoc);
  });
});

app.get("questionpaper", async (req, res) => {
  res.json(
    await QuestionPaper.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

// Get request for Showing All question paper

/*
- Handles GET requests to "/questionpapers"
- Finds all question papers in the database
- Includes the username of the owner for each question paper
- Sorts them by creation date, newest first
- Limits the result to 20 question papers
- Sends the result as JSON to the client
*/

app.get("/questionpapers/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await QuestionPaper.findById(id).populate("owner", [
    "username",
  ]);
  res.json(postDoc);
});

// Get request for Showing invidiual question paper

/*
- Handles GET requests to "/questionpapers/:id"
- Extracts the id parameter from the URL
- Finds the question paper with the specified id
- Includes the username of the owner
- Sends the question paper as JSON to the client
*/

app.get("/questionpaper/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await QuestionPaper.findById(id).populate("owner", [
    "username",
  ]);
  res.json(postDoc);
});

// Post request for uploading Projects

app.post("/projects", async (req, res) => {
  const { Name, StartDate, EndDate, TotalMembers, Topic, Description } =
    req.body;
  const postDoc = await Project.create({
    Name,
    StartDate,
    EndDate,
    TotalMembers,
    Topic,
    Description,
    owner: info.id,
  });
  res.json(postDoc);
});

// Get request for uploading Projects

app.get("/projects", async (req, res) => {
  res.json(
    await Project.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Project.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/project/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Project.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

// Post request for uploading Packages

app.post("/packages", async (req, res) => {
  const { Name, Date, Time, Tip, PickUp, Drop, Description } = req.body;
  const postDoc = await Package.create({
    Name,
    Date,
    Time,
    Tip,
    PickUp,
    Drop,
    Description,
    owner: info.id,
  });
  res.json(postDoc);
});

// Get request for uploading Projects

app.get("/packages", async (req, res) => {
  res.json(
    await Package.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/packages/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Package.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/package/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Package.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

// Post request for uploading Clubs

app.post("/clubs", async (req, res) => {
  const { Name, Date, Time, Fees, Description } = req.body;
  const postDoc = await Club.create({
    Name,
    Date,
    Time,
    Fees,
    Description,
    owner: info.id,
  });
  res.json(postDoc);
});

// Get request for uploading Clubs

app.get("/clubs", async (req, res) => {
  res.json(
    await Club.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/clubs/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Club.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/club/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Club.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

// Post request for uploading Alumni

app.post("/alumniss", async (req, res) => {
  const { Name, Branch, Year, Contact, LinkedIn } = req.body;
  const postDoc = await Alumni.create({
    Name,
    Branch,
    Year,
    Contact,
    LinkedIn,
    owner: info.id,
  });
  res.json(postDoc);
});

// Get request for uploading Alumni

app.get("/alumnis", async (req, res) => {
  res.json(
    await Alumni.find()
      .populate("owner", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/alumnis/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Alumni.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.get("/alumni/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Alumni.findById(id).populate("owner", ["username"]);
  res.json(postDoc);
});

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
