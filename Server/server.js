// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // 👈 Phải đặt trước mọi app.use

// ✅ Redirect www → non-www
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith("www.")) {
    const newHost = req.headers.host.replace(/^www\./, "");
    return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
  }
  next();
});

// CORS cấu hình
const allowedOrigins = [
  "https://sotaspaofficial.onrender.com",
  "https://www.hungvietphat.io.vn",
  "https://hungvietphat.io.vn",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.json());
// Cho phép từ frontend cụ thể
// Import routes
const blogRoutes = require("../Router/blog");
const introductionRoutes = require("../Router/introduction");
const menuRoutes = require("../Router/menu");
const promotionRoutes = require("../Router/promotion");
const advisoryRoutes = require("../Router/advisory");
const bookingRoutes = require("../Router/booking");

// Use routes
app.use("/api/blog", blogRoutes);
app.use("/api/introduction", introductionRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/promotion", promotionRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/booking", bookingRoutes);

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
