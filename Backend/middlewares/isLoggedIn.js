const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      error: true,
      message: "Unauthorized: Invalid token",
    });
  }
};
