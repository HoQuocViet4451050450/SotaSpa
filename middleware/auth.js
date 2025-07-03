const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Phải giống với SECRET_KEY khi tạo token

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Không có token hoặc sai định dạng Bearer!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Gán user đã xác thực vào req
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

module.exports = verifyToken;
