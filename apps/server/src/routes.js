const express = require("express");
const prisma = require("./db");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res.send("Hello World!");
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

router.get("/test", async (req, res) => {
  try {
    const companies = await prisma.companies.findMany();

    return res.json(companies);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

module.exports = router;
