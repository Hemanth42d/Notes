const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/utilities");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("Already have an account");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            fullName,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.json({
            accessToken: token,
            message: "User Succefully Registered",
          });
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.send("Something went wrong.. check your details");

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken: token, message: "Successfully Logged In" });
      } else {
        res.status(401).json({
          error: true,
          message: "Invalid email or password",
        });
      }
    });
  } catch (error) {
    res.send(err.message);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      error: false,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
