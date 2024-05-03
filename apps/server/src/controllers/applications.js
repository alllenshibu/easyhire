const prisma = require("../db");

const getAllApplicationsOfAStudent = async (req, res) => {
  try {
    const applications = await prisma.applications.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        opening: {
          include: {
            company: true,
          },
        },
      },
    });

    return res.status(200).json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await prisma.applications.findFirst({
      where: {
        id: applicationId,
      },
      include: {
        opening: {
          include: {
            company: true,
          },
        },
      },
    });

    return res.status(200).json({ application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createApplication = async (req, res) => {
  try {
    const { openingId, profileId } = req.body;

    const applicationExists = await prisma.applications.findFirst({
      where: {
        userId: req.user.id,
        openingId,
      },
    });

    if (applicationExists) {
      return res.status(400).json({ error: "Application already exists" });
    }

    const application = await prisma.applications.create({
      data: {
        userId: req.user.id,
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
  getApplicationById,
  createApplication,
};
