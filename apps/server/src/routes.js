const express = require("express");

const {
  signupCoordinator,
  loginCoordinator,
  signupStudent,
  loginStudent,
  loginCompany,
} = require("./controllers/auth");
const { getAllCompanies, addNewCompany } = require("./controllers/companies");
const { addNewProfile, getProfiles } = require("./controllers/profiles");
const {
  authorize,
  authorizeCoordinator,
  authorizeCompany,
} = require("./middlewares/auth");
const { getUserDetails } = require("./controllers/user");
const { addNewOpening, getAllOpenings } = require("./controllers/openings");
const { getAllStudents, getStudentDetails } = require("./controllers/students");
const {
  getAllApplicationsOfAStudent,
  createApplication,
} = require("./controllers/applications");
const {
  getAllQuestions,
  getQuestionById,
  getQuestionsByCompany,
  addNewQuestion,
} = require("./controllers/questions");

const router = express.Router();

router.post("/auth/coordinators/signup", signupCoordinator);
router.post("/auth/coordinators/login", loginCoordinator);

router.post("/auth/companies/login", loginCompany);

router.post("/auth/students/signup", signupStudent);
router.post("/auth/students/login", loginStudent);

router.post("/companies", authorizeCoordinator, addNewCompany);
router.get("/companies", authorize, getAllCompanies);

router.post("/openings", authorizeCompany, addNewOpening);
router.get("/openings", authorize, getAllOpenings);

router.get("/students", authorize, getAllStudents);

router.get("/students/:studentId", authorize, getStudentDetails);
router.get("/applications", authorize, getAllApplicationsOfAStudent);
router.post("/applications", authorize, createApplication);

router.get("/questions", getAllQuestions);
router.get("/questions/:questionId", getQuestionById);
router.get("/questions/companies/:companyId", getQuestionsByCompany);
router.post("/questions", addNewQuestion);

router.get("/user", authorize, getUserDetails);
router.post("/profiles", authorize, addNewProfile);
router.get("/profiles/:studentId", authorize, getProfiles);

module.exports = router;
