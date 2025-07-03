// db/index.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Lỗi kết nối PostgreSQL:", err.stack);
  } else {
    console.log("✅ Kết nối PostgreSQL thành công!");
    release(); // Trả lại client về pool
  }
});

module.exports = pool;
