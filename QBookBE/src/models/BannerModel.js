const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    // Các trường dữ liệu của schema
    id: { type: String, required: true, unique: true },
    desc: { type: String },
    activeFrom: { type: Date },
    activeTo: { type: Date },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

// Tạo Model
const Banner = mongoose.model("Banner", BannerSchema);

// Xuất Model
module.exports = Banner;
