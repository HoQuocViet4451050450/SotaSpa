// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Thêm các origin bạn muốn cho phép
const allowedOrigins = [
  "https://sotaspaofficial.onrender.com",
  "https://www.hungvietphat.io.vn",
  // Thêm origin khác tại đây nếu cần
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // nếu có dùng cookie hoặc auth header
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
