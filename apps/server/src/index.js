const express = require("express");
const dotenv = require("dotenv");

const router = require("./routes");

const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 80;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.get("/", (req, res) => {
  return res.send("Easy Hire Server");
});

app.get("/health", (req, res) => {
  const healthcheck = {
    resource: "Easy Hire Server",
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
