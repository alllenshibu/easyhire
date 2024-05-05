const express = require("express");
const multer = require("multer");

const { loginCompany, signup, login } = require("./controllers/auth");
const { getAllCompanies, addNewCompany } = require("./controllers/companies");
const { addNewProfile, getProfiles } = require("./controllers/profiles");
const { authorize, authorizeCompany } = require("./middlewares/auth");
const { getUserDetails } = require("./controllers/user");
const {
  addNewOpening,
  getAllOpenings,
  getOpeningById,
  editOpening,
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
  attemptTest,
} = require("./controllers/training/tests");
const {
  getAllProblems,
  addNewProblem,
  getProblemById,
  getProblemsByCompany,
} = require("./controllers/training/problems");
const {
  getAllGroups,
  createNewGroup,
  getGroupById,
} = require("./controllers/groups");
const { uploadResume } = require("./controllers/resume");

// Hire
const {
  hireGetAllOpenings,
  hireGetOpeningById,
} = require("./controllers/hire/openings");
const { getNotifications } = require("./controllers/students/notifications");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./temp"); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

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
router.put("/openings/:openingId", authorize, editOpening);
router.get("/openings/:openingId", authorize, getOpeningById);

router.get("/students", authorize, getAllStudents);
router.get("/students/:studentId", authorize, getStudentDetails);
router.post(
  "/students/resume",
  authorize,
  upload.single("resume"),
  uploadResume
);

router.get("/applications", authorize, getAllApplicationsOfAStudent);
router.get("/applications/:applicationId", authorize, getApplicationById);
router.post("/applications", authorize, createApplication);

router.get("/notifications", authorize, getNotifications);

router.get("/questions", getAllQuestions);
router.get("/questions/:questionId", getQuestionById);

router.get("/tests", getAllTests);
router.get("/tests/:testId", getTestById);
router.post("/tests", addNewTest);
router.post("/tests/:testId", attemptTest);

router.get("/problems", getAllProblems);
router.get("/problems/:problemId", getProblemById);
router.get("/problems/company/:companyId", getProblemsByCompany);
router.post("/problems", addNewProblem);

router.get("/user", authorize, getUserDetails);
router.post("/profiles", authorize, addNewProfile);
router.get("/profiles/:studentId", authorize, getProfiles);

// Hire
router.get("/hire/openings", authorize, authorizeCompany, hireGetAllOpenings);

module.exports = router;
