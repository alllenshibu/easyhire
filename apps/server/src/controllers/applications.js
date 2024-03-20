const prisma = require("../db");

const getAllApplicationsOfAStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    const applications = await prisma.applications.findMany({
      where: {
        studentId: studentId,
      },
    });

    return res.status(200).json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createApplication = async (req, res) => {
  try {
    const { studentId, openingId, profileId } = req.body;

    const applicationExists = await prisma.applications.findFirst({
      where: {
        studentId,
        openingId,
      },
    });

    if (applicationExists) {
      return res.status(400).json({ error: "Application already exists" });
    }

    const application = await prisma.applications.create({
      data: {
        studentId,
        openingId,
        profileId,
      },
    });
    
    return res.status(200).json({ application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllApplicationsOfAStudent,
  createApplication,
};
