const express = require("express");
const router = express.Router();
const db = require("../Database"); // PostgreSQL Pool
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const verifyToken = require("../middleware/auth");

// Thêm Promotion
router.post("/postpromotion", async (req, res) => {
  const {
    nguoidang,
    tieude,
    tieudephu,
    ngaybatdau,
    ngayhethan,
    luotxem,
    luotthich,
    noidung,
    hinhanh,
    duonglink,
    lienhe,
  } = req.body;

  const sql = `
    INSERT INTO promotion_table 
    (nguoidang, tieude, tieudephu, ngaybatdau, ngayhethan, luotxem, luotthich, noidung, hinhanh, duonglink, lienhe)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [
      nguoidang,
      tieude,
      tieudephu,
      ngaybatdau,
      ngayhethan,
      luotxem,
      luotthich,
      noidung,
      hinhanh,
      duonglink,
      lienhe,
    ]);
    res.json({ message: "Thêm khuyến mãi thành công", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa Promotion
router.delete("/deletepromotion/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM promotion_table WHERE id = $1`;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Xóa khuyến mãi thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sửa Promotion
router.put("/updatepromotion/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nguoidang,
    tieude,
    tieudephu,
    ngaybatdau,
    ngayhethan,
    luotxem,
    luotthich,
    noidung,
    hinhanh,
    duonglink,
    lienhe,
  } = req.body;

  const sql = `
    UPDATE promotion_table
    SET nguoidang = $1, tieude = $2, tieudephu = $3, ngaybatdau = $4, ngayhethan = $5, luotxem = $6, luotthich = $7, noidung = $8, hinhanh = $9, duonglink = $10, lienhe = $11
    WHERE id = $12
  `;

  try {
    await db.query(sql, [
      nguoidang,
      tieude,
      tieudephu,
      ngaybatdau,
      ngayhethan,
      luotxem,
      luotthich,
      noidung,
      hinhanh,
      duonglink,
      lienhe,
      id,
    ]);
    res.json({ message: "Cập nhật khuyến mãi thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy danh sách Promotion
router.get("/getpromotions", async (req, res) => {
  const sql = "SELECT * FROM promotion_table ORDER BY id DESC";

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy Promotion theo ID
router.get("/getpromotion/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM promotion_table WHERE id = $1";

  try {
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy khuyến mãi" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tăng lượt xem
router.put("/viewpromotion/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `
    UPDATE promotion_table
    SET luotxem = luotxem + 1
    WHERE id = $1
  `;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Đã tăng lượt xem" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tăng lượt thích
router.put("/likepromotion/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `
    UPDATE promotion_table
    SET luotthich = luotthich + 1
    WHERE id = $1
  `;

  try {
    await db.query(sql, [id]);
    res.json({ message: "Đã tăng lượt thích" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
