const express = require("express");
const router = express.Router();
const db = require("../Database"); // PostgreSQL Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// Thêm lịch hẹn
router.post("/add", async (req, res) => {
  const {
    sodienthoai,
    gioitinh,
    hovaten,
    chinhanh,
    thoigiandatlich,
    kythuatvien,
    khunggiophucvu,
    dichvu_id,
    ghichu,
  } = req.body;

  if (!sodienthoai || !hovaten || !thoigiandatlich || !dichvu_id) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  const sql = `
    INSERT INTO booking_table 
    (sodienthoai, gioitinh, hovaten, chinhanh, thoigiandatlich, kythuatvien, khunggiophucvu, dichvu_id, ghichu)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [
      sodienthoai,
      gioitinh,
      hovaten,
      chinhanh,
      thoigiandatlich,
      kythuatvien,
      khunggiophucvu,
      dichvu_id,
      ghichu,
    ]);

    res
      .status(201)
      .json({ message: "Đặt lịch thành công", booking_id: result.rows[0].id });
  } catch (err) {
    console.error("Lỗi khi thêm booking:", err);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

// Lấy tất cả lịch booking
router.get("/", async (req, res) => {
  const sql = `SELECT * FROM booking_table ORDER BY thoigiandatlich DESC`;

  try {
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Lỗi khi truy vấn booking:", err);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

module.exports = router;
