const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const port = process.env.PORT || 3001;
dotenv.config();

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
var whitelist = ["http://localhost:3000", process.env.CLIENT_URL];
var corsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log(process.env.CLIENT_URL);
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
