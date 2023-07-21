const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const registerModel = require("./models/register"); // Corrected the import path

app.use(express.static("public"));
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.Mongo_db_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const test_db = mongoose.connection.useDb("test"); // Connect to the "test" database

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

// Route to send the array of words to the client
app.get("/start", async (req, res) => {
  try {
    const time = parseInt(req.query.time); // Extract the time value from the query parameters
    const level = req.query.level; // Extract the level value from the query parameters

    // Validate the time and level values
    if (isNaN(time) || time <= 0) {
      return res.status(400).json({ message: "Invalid time value" });
    }

    if (!["easy", "medium", "hard"].includes(level)) {
      return res.status(400).json({ message: "Invalid level value" });
    }

    // Fetch the document from the "Words" collection based on the level level
    const document = await test_db
      .collection("Words")
      .findOne({ level: level });

    if (
      !document ||
      !document.words_for_typing ||
      document.words_for_typing.length === 0
    ) {
      // If no word is found, handle the case
      return res
        .status(404)
        .json({ message: "No words found in the collection" });
    }

    // Set cache control headers to avoid 304 Not Modified responses
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Send the entire array of words_for_typing in the response
    res.json(document.words_for_typing);
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ error: "Unable to fetch words" });
  }
});

app.post("/signup", async (req, res) => {
  console.log("here I am");

  const new_user = new registerModel({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(new_user);

  try {
    await new_user.save();
    console.log("added");
    res.redirect("login.html");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred during registration");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await registerModel.find({
      email: email,
      password: password,
    });
    console.log(result);
    if (result.length !== 0) {
      res.redirect("home.html");
    } else {
      res.send("Invalid password/name");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred during login");
  }
});
