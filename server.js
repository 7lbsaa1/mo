// استدعاء مكتبة Express لبناء السيرفر ومكتبة File System لقراءة الملفات
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

// السماح بتبادل البيانات بأمان بين السيرفر والـ React (CORS)
const cors = require('cors');
app.use(cors());
app.use(express.json());

// 🚀 إنشاء رابط ذكي (API Endpoint) لعرض المنتجات
app.get('/api/products', (req, res) => {
  // قراءة ملف الـ JSON الذي صممناه في الخطوة الأولى
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "فشل في قراءة بيانات الملابس" });
    }
    // إرسال البيانات للـ React فوراً
    res.json(JSON.parse(data));
  });
});

// تشغيل السيرفر على بورت 5000
app.listen(PORT, () => {
  console.log(`سيرفر 7LBSAA الخلفي يعمل الآن بنجاح على الرابط: http://localhost:${PORT}`);
});
