const prisma = require("../db");

const getAllOpenings = async (req, res) => {
  try {
    const openings = await prisma.openings.findMany();
    return res.json({ openings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const addNewOpening = async (req, res) => {
  try {
    const { title, description, companyId } = req.body;

    if (!title || !description || !companyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOpening = await prisma.openings.create({
      data: {
        title,
        description,
        company: { connect: { id: companyId } },
      },
    });

    if (!newOpening) {
      return res.status(400).json({ error: "Job posting not added" });
    }

    return res.status(201).json({ newOpening });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllOpenings,
  addNewOpening,
};
