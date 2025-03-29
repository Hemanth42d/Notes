const express = require("express");
const cookieParser = require("cookie-parser");
const userRouters = require("./Routes/userRouters");
require("dotenv").config();
const db = require("./config/mongooseConnection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", userRouters);

app.listen(8000, () => {
  console.log(`Port is running at https://localhost:${8000}`);
});
