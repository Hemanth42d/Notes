const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const userRouters = require("./Routes/userRouters");
require("dotenv").config();

const db = require("./config/mongooseConnection");

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", userRouters);

app.listen(8000, () => {
  console.log(`Port is running at https://localhost:${8000}`);
});
