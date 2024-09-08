const mongoose = require("mongoose"); // Import Mongoose

// Định nghĩa Schema
const userSchema = new mongoose.Schema(
  {
    // Các trường dữ liệu của schema
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    avatar: { type: String },
    isActive: { type: Boolean, default: true, required: true },
    cart: {},
  },
  {
    // - Các tùy chọn của schema
    // - Ngoài ra, schema còn có một tùy chọn là timestamps: true,
    // cho phép Mongoose tự động thêm hai trường createdAt và updatedAt
    // vào mỗi bản ghi để theo dõi thời gian tạo và cập nhật.
    timestamps: true,
  }
);

// Tạo Model
const User = mongoose.model("User", userSchema);

// Xuất Model
module.exports = User;
