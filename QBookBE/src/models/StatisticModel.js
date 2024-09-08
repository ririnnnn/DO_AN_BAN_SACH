const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema(
  {
    date: { type: Date, require: true, unique: true },
    statisticByNumber: [
      {
        genre: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Genre",
          required: true,
        },
        number: { type: Number, required: true },
      },
    ],
    statisticByRevenure: [
      {
        genre: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Genre",
          required: true,
        },
        number: { type: Number, required: true },
      },
    ],
    bestSellers: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        number: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Statistic = mongoose.model("statistic", statisticSchema);

module.exports = Statistic;
