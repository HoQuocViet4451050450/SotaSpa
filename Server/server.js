// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
