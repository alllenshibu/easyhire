const prisma = require("../db");

const getAllOpenings = async (req, res) => {
  try {
    const openings = await prisma.openings.findMany({
      include: { company: true },
    });
    return res.json({ openings, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const addNewOpening = async (req, res) => {
  try {
    const { companyId, role, location, description, renumeration } = req.body;

    if (!companyId || !role || !location || !description || !renumeration) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const newOpening = await prisma.openings.create({
      data: {
        role,
        location,
        description,
        renumeration: Number(renumeration),
        companyId,
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
  addNewOpening,
};
