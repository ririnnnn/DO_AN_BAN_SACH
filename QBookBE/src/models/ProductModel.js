const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    discount: { type: Number, require: true },
    description: { type: String, require: true },
    selled: { type: Number },
    pageCount: { type: Number, require: true },
    format: { type: String, require: true },
    weight: { type: String, require: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
    ratings: [ratingSchema]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
