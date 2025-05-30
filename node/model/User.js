const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  parentPhone: {
    type: String,
    required: true,
    length: 11,
  },
  field: {
    type: String,
    required: true,
    enum: ["ساختمان", "کامپیوتر"],
  },
  nationalCode: {
    type: String,
    required: true,
    length: 10,
<<<<<<< HEAD
=======
    unique: true,
>>>>>>> c61f234e41d9d8a2397b54c71209ade9efe0b412
  },
  address: {
    type: String,
    required: true,
    max: 2250,
  },
  transcript: {
    type: String, // مسیر فایل کارنامه تحصیلی
    required: true,
  },
  guidancePriority: {
    type: String, // مسیر فایل اولویت‌های هدایت تحصیلی
    required: true,
  },
  award: {
    type: String,
    max: 2250,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
