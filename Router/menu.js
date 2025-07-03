const express = require("express");
const router = express.Router();
const db = require("../Database"); // PostgreSQL Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// 📌 Thêm mới một dịch vụ
router.post("/dichvu", async (req, res) => {
  const { tendichvu, mota } = req.body;
  const sql = `INSERT INTO dichvu_table (tendichvu, mota) VALUES ($1, $2) RETURNING id`;

  try {
    const result = await db.query(sql, [tendichvu, mota]);
    res.json({ message: "Thêm dịch vụ thành công", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Thêm gói dịch vụ
router.post("/goidichvu", async (req, res) => {
  const { tengoi, solan, gia, dichvu_id } = req.body;
  console.log("📥 Body nhận được:", req.body);

  if (!tengoi || !solan || !gia || !dichvu_id) {
    return res.status(400).json({ error: "Thiếu dữ liệu" });
  }

  const sql = `INSERT INTO goidichvu_table (tengoi, solan, gia, dichvu_id) VALUES ($1, $2, $3, $4) RETURNING id`;

  try {
    const result = await db.query(sql, [tengoi, solan, gia, dichvu_id]);
    res.json({ message: "Thêm gói dịch vụ thành công", id: result.rows[0].id });
  } catch (err) {
    console.error("❌ SQL Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📌 Lấy danh sách tất cả dịch vụ và gói tương ứng
router.get("/dichvu", async (req, res) => {
  const sql = `
    SELECT 
      dv.id AS dichvu_id,
      dv.tendichvu,
      dv.mota,
      gd.id AS goi_id,
      gd.tengoi,
      gd.solan,
      gd.gia
    FROM dichvu_table dv
    LEFT JOIN goidichvu_table gd ON dv.id = gd.dichvu_id
    ORDER BY dv.id ASC, gd.id ASC
  `;

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Cập nhật dịch vụ
router.put("/dichvu/:id", async (req, res) => {
  const { tendichvu, mota } = req.body;
  const { id } = req.params;
  const sql = `UPDATE dichvu_table SET tendichvu = $1, mota = $2 WHERE id = $3`;

  try {
    await db.query(sql, [tendichvu, mota, id]);
    res.json({ message: "Cập nhật dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Cập nhật gói dịch vụ
router.put("/goidichvu/:id", async (req, res) => {
  const { tengoi, solan, gia } = req.body;
  const { id } = req.params;
  const sql = `UPDATE goidichvu_table SET tengoi = $1, solan = $2, gia = $3 WHERE id = $4`;

  try {
    await db.query(sql, [tengoi, solan, gia, id]);
    res.json({ message: "Cập nhật gói dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Xóa dịch vụ
router.delete("/dichvu/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM dichvu_table WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Xóa dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Xóa gói dịch vụ
router.delete("/goidichvu/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM goidichvu_table WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Xóa gói dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Lấy danh sách tên dịch vụ
router.get("/tendichvu", async (req, res) => {
  const sql = `SELECT id, tendichvu FROM dichvu_table ORDER BY id ASC`;

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
