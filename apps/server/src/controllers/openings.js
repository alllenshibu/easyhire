const prisma = require("../db");

const getAllOpenings = async (req, res) => {
  try {
    const openings = await prisma.openings.findMany({
      include: { company: true, applications: true },
    });
    return res.json({ openings, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const getOpeningById = async (req, res) => {
  try {
    const { openingId } = req.params;

    if (!openingId) {
      return res.status(400).json({ error: "Opening ID is required" });
    }

    let opening = await prisma.openings.findUnique({
      where: { id: openingId },
      include: {
        company: true,
        applications: {
          include: { user: true },
        },
      },
    });

    if (!opening) {
      return res.status(404).json({ error: "Opening not found" });
    }

    return res.json({ opening, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const editOpening = async (req, res) => {
  try {
    const { openingId } = req.params;
    const {
      role,
      location,
      description,
      responsibilites,
      requirements,
      renumeration,
    } = req.body;

    if (!openingId) {
      return res.status(400).json({ error: "Opening ID is required" });
    }

    if (
      !role ||
      !location ||
      !description ||
      !responsibilites ||
      !requirements ||
      !renumeration
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const opening = await prisma.openings.update({
      where: { id: openingId },
      data: {
        role,
        location,
        description,
        responsibilites,
        requirements,
        renumeration: renumeration,
      },
    });

    if (!opening) {
      return res.status(400).json({ error: "Job posting not updated" });
    }

    return res.status(200).json({ opening, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const addNewOpening = async (req, res) => {
  try {
    const {
      companyId,
      role,
      location,
      description,
      responsibilities,
      requirements,
      remuneration,
      type,
      experience,
    } = req.body;

    if (
      !companyId ||
      !role ||
      !location ||
      !description ||
      !responsibilities ||
      !requirements ||
      !remuneration
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const newOpening = await prisma.openings.create({
      data: {
        role,
        location,
        description,
        responsibilities,
        requirements,
        remuneration,
        companyId,
        type,
        experience,
      },
    });

    if (!newOpening) {
      return res.status(400).json({ error: "Job posting not added" });
    }

    return res.status(200).json({ newOpening, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = {
  getAllOpenings,
  getOpeningById,
  editOpening,
  addNewOpening,
};
