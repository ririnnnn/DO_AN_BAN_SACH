const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
