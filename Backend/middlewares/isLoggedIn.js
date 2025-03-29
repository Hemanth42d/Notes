const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async (req, res) => {
  if (!req.cookies.token) {
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET
    );

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.redirect("/");
  }
};
