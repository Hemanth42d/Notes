const express = require("express");
const router = express();

const { registerUser, loginUser } = require("../controllers/authController");

router.use("/signUp", registerUser);
router.use("/login", loginUser);

module.exports = router;
