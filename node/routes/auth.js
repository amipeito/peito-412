const express = require("express");
const router = express.Router();
const User = require("../model/User");
const multer = require("multer");
const path = require("path");

// تنظیمات multer برای ذخیره‌سازی فایل
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to uploads directory:", file.originalname);
    cb(null, "uploads/"); // پوشه‌ای برای ذخیره عکس‌ها
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + "-" + file.originalname;
    console.log("Generated filename:", newFilename);
    cb(null, newFilename); // نام فایل
  },
});

const upload = multer({ storage });

// مسیر دریافت لیست ثبت‌نام‌ها
router.get("/registrations", async (req, res) => {
  try {
    const registrations = await User.find().sort({ date: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// مسیر ثبت‌نام با آپلود عکس
router.post(
  "/register",
  upload.fields([
    { name: "transcript", maxCount: 1 },
    { name: "guidancePriority", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Received registration request");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const { fullName, parentPhone, field, nationalCode, address, award } =
        req.body;

      // دریافت مسیر فایل‌های آپلود شده
      const transcriptPath = req.files["transcript"]
        ? req.files["transcript"][0].filename
        : null;
      const guidancePriorityPath = req.files["guidancePriority"]
        ? req.files["guidancePriority"][0].filename
        : null;

      console.log("File paths:", { transcriptPath, guidancePriorityPath });

      const user = new User({
        fullName,
        parentPhone,
        field,
        nationalCode,
        address,
        transcript: transcriptPath,
        guidancePriority: guidancePriorityPath,
        award,
      });

      console.log("Created user object:", user);

      const savedUser = await user.save();
      console.log("User saved successfully:", savedUser);

      res.status(201).json({ success: true, data: savedUser });
    } catch (err) {
      console.error("Error in registration:", err);
      res.status(400).json({ success: false, error: err.message });
    }
  }
);

// مسیر ورود
router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
