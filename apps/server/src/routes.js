const express = require("express");

const { signup, login } = require("./controllers/auth");
const { getAllCompanies, addNewCompany } = require("./controllers/companies");
const { getAllJobPostings, addNewJobPosting } = require("./controllers/jobs");
const auth = require("./middlewares/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/companies", auth, getAllCompanies);
router.post("/companies", auth, addNewCompany);

router.get("/jobs", auth, getAllJobPostings);
router.post("/jobs", auth, addNewJobPosting);

module.exports = router;
