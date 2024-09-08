const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    address: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;
