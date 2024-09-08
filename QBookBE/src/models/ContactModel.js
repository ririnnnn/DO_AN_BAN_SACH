const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true },
    address: { type: String, require: true },
    content: { type: String, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
