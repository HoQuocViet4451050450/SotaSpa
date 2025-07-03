const express = require("express");
const router = express.Router();
const db = require("../Database"); // PostgreSQL Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// Thêm Blog
router.post("/postblog", async (req, res) => {
  const {
    nguoidang,
    tieude,
    tieudephu,
    ngaydang,
    luotxem,
    luotthich,
    noidung,
    hinhanh,
    duonglink,
    lienhe,
  } = req.body;

  const sql = `
    INSERT INTO blog_table 
    (nguoidang, tieude, tieudephu, ngaydang, luotxem, luotthich, noidung, hinhanh, duonglink, lienhe)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [
      nguoidang,
      tieude,
      tieudephu,
      ngaydang,
      luotxem,
      luotthich,
      noidung,
      hinhanh,
      duonglink,
      lienhe,
    ]);
    res.json({ message: "Thêm thành công", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa Blog
router.delete("/deleteblog/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM blog_table WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sửa Blog
router.put("/updateblog/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nguoidang,
    tieude,
    tieudephu,
    ngaydang,
    luotxem,
    luotthich,
    noidung,
    hinhanh,
    duonglink,
    lienhe,
  } = req.body;

  const sql = `
    UPDATE blog_table
    SET nguoidang = $1, tieude = $2, tieudephu = $3, ngaydang = $4, luotxem = $5, 
        luotthich = $6, noidung = $7, hinhanh = $8, duonglink = $9, lienhe = $10
    WHERE id = $11
  `;

  try {
    await db.query(sql, [
      nguoidang,
      tieude,
      tieudephu,
      ngaydang,
      luotxem,
      luotthich,
      noidung,
      hinhanh,
      duonglink,
      lienhe,
      id,
    ]);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả blog
router.get("/getblogs", async (req, res) => {
  const sql = "SELECT * FROM blog_table ORDER BY id DESC";

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy blog theo ID
router.get("/getblog/:id", async (req, res) => {
  const blogId = req.params.id;
  const sql = "SELECT * FROM blog_table WHERE id = $1";

  try {
    const result = await db.query(sql, [blogId]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tăng lượt xem
router.put("/viewblog/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE blog_table SET luotxem = luotxem + 1 WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Đã tăng lượt xem" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tăng lượt thích
router.put("/likeblog/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE blog_table SET luotthich = luotthich + 1 WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Đã tăng lượt thích" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
