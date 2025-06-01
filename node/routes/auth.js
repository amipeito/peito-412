const express = require("express");
const router = express.Router();
const User = require("../model/User");
const multer = require("multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

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

// فیلتر نوع فایل فقط عکس
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/jpg',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('فقط فایل عکس با فرمت jpg, jpeg, png, gif, webp مجاز است!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // حداکثر 50 مگابایت برای هر فایل
});

// یوزر تستی (در عمل باید از دیتابیس بخوانی)
const adminUser = {
  username: 'Javad',
  password: bcrypt.hashSync('13607080', 10) // پسورد هش شده
};

// Middleware احراز هویت
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'توکن وجود ندارد' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'توکن نامعتبر است' });
  }
}

// مسیر دریافت لیست ثبت‌نام‌ها (محافظت‌شده)
router.get("/registrations", authMiddleware, async (req, res) => {
  try {
    const registrations = await User.find().sort({ date: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// محدودیت تعداد درخواست ثبت‌نام: هر IP فقط هر ۳ دقیقه یک بار
const registerLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 دقیقه
  max: 1, // فقط یک درخواست
  message: {
    success: false,
    error: 'شما فقط هر ۳ دقیقه یک بار می‌توانید ثبت‌نام کنید. لطفاً بعداً دوباره تلاش کنید.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// مسیر ثبت‌نام با آپلود عکس و اعتبارسنجی فیلدها
router.post(
  "/register",
  [
    registerLimiter,
  upload.fields([
    { name: "transcript", maxCount: 1 },
    { name: "guidancePriority", maxCount: 1 },
  ]),
    // اعتبارسنجی فیلدها
    body('fullName').isLength({ min: 3 }).withMessage('نام و نام خانوادگی باید حداقل ۳ حرف باشد'),
    body('parentPhone').isLength({ min: 11, max: 11 }).isNumeric().withMessage('شماره تماس باید ۱۱ رقم باشد'),
    body('field').notEmpty().withMessage('رشته آموزشی الزامی است'),
    body('nationalCode').isLength({ min: 10, max: 10 }).isNumeric().withMessage('کد ملی باید ۱۰ رقم باشد'),
    body('address').notEmpty().withMessage('آدرس الزامی است').isLength({ max: 2250 }).withMessage('آدرس حداکثر ۱۵ خط است'),
    body('award').optional().isLength({ max: 2250 }).withMessage('لوح تقدیر حداکثر ۱۵ خط است'),
  ],
  async (req, res) => {
    // بررسی خطاهای اعتبارسنجی
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      // بررسی ثبت‌نام قبلی با کد ملی یا شماره تماس
      const { nationalCode, parentPhone, fullName, field, address, award } = req.body;
      const existingUser = await User.findOne({
        $or: [
          { nationalCode },
          { parentPhone }
        ]
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'شما قبلاً ثبت‌نام کرده‌اید و نیازی به ارسال مجدد نیست.'
        });
      }
      console.log("Received registration request");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

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

// مسیر لاگین امن
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username.toLowerCase() !== adminUser.username.toLowerCase()) {
    return res.status(401).json({ error: 'نام کاربری اشتباه است' });
  }
  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'رمز عبور اشتباه است' });
  }
  // ساخت توکن
  const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
