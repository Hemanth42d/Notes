const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect("/");
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
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.redirect("/");
  }
};
