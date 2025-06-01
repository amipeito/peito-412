const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const visitRoute = require("./routes/visit");

dotenv.config();

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Middleware برای پردازش JSON و فایل‌ها
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسیر برای دریافت فایل‌های آپلود شده
app.use("/api/user/uploads", express.static(path.join(__dirname, "uploads")));

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);

    // حذف کالکشن users در صورت وجود
    try {
      await mongoose.connection.db.dropCollection("users");
      console.log("Collection users dropped");
    } catch (err) {
      // اگر کالکشن وجود نداشت، خطا را نادیده می‌گیریم
      if (err.code !== 26) {
        console.error("Error dropping collection:", err);
      }
    }

    console.log("Connected to DB!");

    app.use("/api/user", authRoute);
    app.use("/api/visit", visitRoute);

    // Middleware هندل خطاهای multer و فایل غیرمجاز
    app.use((err, req, res, next) => {
      if (err && (err.message.includes('فقط فایل عکس') || err.name === 'MulterError')) {
        return res.status(400).json({ error: err.message });
      }
      next(err);
    });

    app.listen(3000, () => console.log("Server is running on port 3000"));
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

startServer();
