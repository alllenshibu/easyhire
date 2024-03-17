const prisma = require("../db");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.companies.findMany({});
    return res.json({ companies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//
// Can be done only by coordinators
//
const addNewCompany = async (req, res) => {
  try {
    const { name, email, password, website, logo } = req.body;

    if (!name || !email || !password || !website || !logo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCompany = await prisma.companies.create({
      data: {
        name,
        email,
        password,
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
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllCompanies,
  addNewCompany,
};
