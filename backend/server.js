const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
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
    const difficulty = req.query.difficulty; // Extract the difficulty value from the query parameters

    // Validate the time and difficulty values
    if (isNaN(time) || time <= 0) {
      return res.status(400).json({ message: "Invalid time value" });
    }

    if (!["easy", "medium", "hard"].includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty value" });
    }

    // Fetch the document from the "Words" collection based on the difficulty level
    const document = await test_db
      .collection("Words")
      .findOne({ level: difficulty });

    console.log(document)

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



