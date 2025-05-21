// وارد کردن ماژول‌ها
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

// ایجاد اپلیکیشن
const app = express();

// تنظیمات Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تنظیمات ذخیره فایل با Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// متغیر برای ذخیره اطلاعات ثبت‌نام شده
let registrations = [];

// تست سرور
app.get("/", (req, res) => {
  res.send("hello JoyBoy");
});

// روت دریافت فرم ثبت‌نام
app.post(
  "/register",
  upload.fields([
    { name: "transcript", maxCount: 1 }, // کارنامه
    { name: "guidancePriority", maxCount: 1 }, // اولویت هدایت
  ]),
  (req, res) => {
    console.log("Received form data:", req.body);
    console.log("Uploaded files:", req.files);

    // اضافه کردن اطلاعات به لیست registrations
    const newRegistration = {
      id: registrations.length + 1,
      ...req.body,
      transcript: req.files?.transcript?.[0]?.filename || null,
      guidancePriority: req.files?.guidancePriority?.[0]?.filename || null,
    };

    registrations.push(newRegistration);

    // بدون alert - فقط پاسخ JSON
    res.json({ success: true });
  }
);

// روت برای دریافت اطلاعات ثبت‌نام شده
app.get("/api/registrations", (req, res) => {
  res.json(registrations);
});

// روت‌های API دوره‌ها (اگر نیاز بود)
const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "javascript" },
];

app.get("/api/courses", (req, res) => {
  res.send(["html", "css", "java"]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("Name is required and should be at least 3 characters");
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

// پورت گوش دادن
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
