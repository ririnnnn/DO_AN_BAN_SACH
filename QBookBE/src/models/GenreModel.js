const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
