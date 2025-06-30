require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouters = require("./Routes/userRouters");
const db = require("./config/mongooseConnection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", userRouters);

app.listen(PORT, () => {
  console.log(`Port is running at https://localhost:${8000}`);
});
