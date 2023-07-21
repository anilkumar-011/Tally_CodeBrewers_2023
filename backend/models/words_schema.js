const mongoose = require("mongoose");

// Create a Mongoose Schema for the words
const wordSchema = new mongoose.Schema({
  words: {
    type: [String],
    required: true,
  },
});

module.exports = wordSchema;
