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
          res.cookie("token", token);
          res.send("User registerd Successfully");
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
        res.cookie("token", token);
        // res.json(token);
        res.send("Succesfully LogedIn...");
      } else {
        res.send("Something went wrong.. Check your details");
      }
    });
  } catch (error) {
    res.send(err.message);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("Logout succesfully");
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};
