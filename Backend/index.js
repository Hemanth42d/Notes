require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouters = require("./Routes/userRouters");
const db = require("./config/mongooseConnection");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", userRouters);

app.listen(8000, () => {
  console.log(`Port is running at https://localhost:${8000}`);
});
