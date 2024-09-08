const mongoose = require("mongoose");

const newScheme = new mongoose.Schema(
  {
    title: { type: String, require: true },
    image: { type: String, require: true },
    ckeditor: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const New = mongoose.model("New", newScheme);

module.exports = New;
