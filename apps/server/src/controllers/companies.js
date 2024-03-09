const prisma = require("../db");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.companies.findMany();
    return res.json({ companies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const addNewCompany = async (req, res) => {
  try {
    const { name, email, website, logo } = req.body;

    if (!name || !email || !website || !logo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCompany = await prisma.companies.create({
      data: {
        name,
        email,
        website,
        logo,
      },
    });

    if (!newCompany) {
      return res.status(400).json({ error: "Company not created" });
    }

    return res.status(201).json({ newCompany });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCompanies,
  addNewCompany,
};
