const express = require("express");

const { getAllCompanies, addNewCompany } = require("./controllers/companies");
const { getAllJobPostings, addNewJobPosting } = require("./controllers/jobs");

const router = express.Router();

router.get("/companies", getAllCompanies);
router.post("/companies", addNewCompany);

router.get("/jobs", getAllJobPostings);
router.post("/jobs", addNewJobPosting);

module.exports = router;
