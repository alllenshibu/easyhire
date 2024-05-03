const express = require("express");

const { loginCompany, signup, login } = require("./controllers/auth");
const { getAllCompanies, addNewCompany } = require("./controllers/companies");
const { addNewProfile, getProfiles } = require("./controllers/profiles");
const { authorize } = require("./middlewares/auth");
const { getUserDetails } = require("./controllers/user");
const {
  addNewOpening,
  getAllOpenings,
  getOpeningById,
} = require("./controllers/openings");
const { getAllStudents, getStudentDetails } = require("./controllers/students");
const {
  getAllApplicationsOfAStudent,
  createApplication,
  getApplicationById,
} = require("./controllers/applications");
const {
  getAllQuestions,
  getQuestionById,
  getAllTests,
  getTestById,
  addNewTest,
} = require("./controllers/tests");
const {
  getAllProblems,
  addNewProblem,
  getProblemById,
  getProblemsByCompany,
} = require("./controllers/problems");
const {
  getAllGroups,
  createNewGroup,
  getGroupById,
} = require("./controllers/groups");

const router = express.Router();

router.post("/auth/coordinators/signup", signup);
router.post("/auth/coordinators/login", login);

router.post("/auth/companies/login", loginCompany);

router.post("/auth/students/signup", signup);
router.post("/auth/students/login", login);

router.get("/groups", getAllGroups);
router.get("/groups/:groupId", getGroupById);
router.post("/groups", createNewGroup);

router.post("/companies", authorize, addNewCompany);
router.get("/companies", authorize, getAllCompanies);

router.post("/openings", authorize, addNewOpening);
router.get("/openings", authorize, getAllOpenings);
router.get("/openings/:openingId", authorize, getOpeningById);

router.get("/students", authorize, getAllStudents);
router.get("/students/:studentId", authorize, getStudentDetails);

router.get("/applications", authorize, getAllApplicationsOfAStudent);
router.get("/applications/:applicationId", authorize, getApplicationById);
router.post("/applications", authorize, createApplication);

router.get("/questions", getAllQuestions);
router.get("/questions/:questionId", getQuestionById);

router.get("/tests", getAllTests);
router.get("/tests/:testId", getTestById);
router.post("/tests", addNewTest);

router.get("/problems", getAllProblems);
router.get("/problems/:problemId", getProblemById);
router.get("/problems/company/:companyId", getProblemsByCompany);
router.post("/problems", addNewProblem);

router.get("/user", authorize, getUserDetails);
router.post("/profiles", authorize, addNewProfile);
router.get("/profiles/:studentId", authorize, getProfiles);

module.exports = router;
