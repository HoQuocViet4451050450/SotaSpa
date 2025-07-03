const express = require("express");
const router = express.Router();
const db = require("../Database"); // Đã chuyển sang pg Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// Thêm dữ liệu vào advisory_table
router.post("/postadvisory", async (req, res) => {
  const { tenkhachhang, sodienthoai, email, dichvu_id, chinhanh, thoigian } =
    req.body;

  if (
    !tenkhachhang ||
    !sodienthoai ||
    !email ||
    !dichvu_id ||
    !chinhanh ||
    !thoigian
  ) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
  }

  const sql = `INSERT INTO advisory_table 
               (tenkhachhang, sodienthoai, email, dichvu_id, chinhanh, thoigian)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING id`;

  try {
    const result = await db.query(sql, [
      tenkhachhang,
      sodienthoai,
      email,
      dichvu_id,
      chinhanh,
      thoigian,
    ]);
    res.status(201).json({
      message: "Thêm thành công.",
      advisoryId: result.rows[0].id,
    });
  } catch (err) {
    console.error("❌ Lỗi khi thêm dữ liệu:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

// Lấy tất cả dữ liệu từ advisory_table
router.get("/getadvisory", async (req, res) => {
  const sql = `SELECT 
                 a.id, 
                 a.tenkhachhang, 
                 a.sodienthoai, 
                 a.email, 
                 a.dichvu_id,
                 d.tendichvu,   
                 a.chinhanh, 
                 a.thoigian
               FROM advisory_table a
               LEFT JOIN dichvu_table d ON a.dichvu_id = d.id
               ORDER BY a.id DESC`;

  try {
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách tư vấn:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = router;
