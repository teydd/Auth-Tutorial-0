const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorised - Invalid or Expired token" });
  }

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT);
    req.userId = userId;
    req.role = role;
    next();
  } catch (error) {
    console.log("Error verify token middleware");
    res.status(400).json({ message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.role || req.role != "admin") {
    return res
      .status(401)
      .json({ message: "Unauthorised access - Admin Only" });
  }
  next();
};
module.exports = { verifyToken, isAdmin };
