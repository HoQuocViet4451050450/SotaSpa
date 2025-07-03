const express = require("express");
const router = express.Router();
const db = require("../Database"); // PostgreSQL Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// Thêm Introduction - tự động lấy timestamp hiện tại (nếu table có cột thời gian tự động)
router.post("/postintro", async (req, res) => {
  const { tieude, noidung1, hinhanh1, noidung2, hinhanh2, ketluan } = req.body;

  const sql = `
    INSERT INTO introduction_table (tieude, noidung1, hinhanh1, noidung2, hinhanh2, ketluan)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [
      tieude,
      noidung1,
      hinhanh1,
      noidung2,
      hinhanh2,
      ketluan,
    ]);
    res.json({ message: "Thêm thành công", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa Introduction
router.delete("/deleteintro/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM introduction_table WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật Introduction
router.put("/updateintro/:id", async (req, res) => {
  const { id } = req.params;
  const { tieude, noidung1, hinhanh1, noidung2, hinhanh2, ketluan } = req.body;

  const sql = `
    UPDATE introduction_table
    SET tieude = $1, noidung1 = $2, hinhanh1 = $3, noidung2 = $4, hinhanh2 = $5, ketluan = $6
    WHERE id = $7
  `;

  try {
    await db.query(sql, [
      tieude,
      noidung1,
      hinhanh1,
      noidung2,
      hinhanh2,
      ketluan,
      id,
    ]);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả Introduction
router.get("/getintros", async (req, res) => {
  const sql = "SELECT * FROM introduction_table ORDER BY id DESC";

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy một Introduction theo ID
router.get("/getintro/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM introduction_table WHERE id = $1";

  try {
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy nội dung" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
