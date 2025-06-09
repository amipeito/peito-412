const express = require('express');
const router = express.Router();
const Visit = require('../model/Visit');

// ثبت بازدید جدید
router.post('/register', async (req, res) => {
  try {
    await Visit.create({});
    res.status(201).json({ message: 'بازدید ثبت شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا در ثبت بازدید' });
  }
});

// گرفتن آمار بازدید
router.get('/stats', async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

    const [today, week, total] = await Promise.all([
      Visit.countDocuments({ createdAt: { $gte: startOfToday } }),
      Visit.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Visit.countDocuments({})
    ]);
    res.json({ today, week, total });
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت آمار' });
  }
});

module.exports = router; 