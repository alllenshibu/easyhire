const prisma = require("./../db");

const getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await prisma.jobs.findMany();
    return res.json({ jobPostings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const addNewJobPosting = async (req, res) => {
  try {
    const { title, description, companyId } = req.body;

    if (!title || !description || !companyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newJobPosting = await prisma.jobs.create({
      data: {
        title,
        description,
        company: { connect: { id: companyId } },
      },
    });

    if (!newJobPosting) {
      return res.status(400).json({ error: "Job posting not added" });
    }

    return res.status(201).json({ newJobPosting });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJobPostings,
  addNewJobPosting,
};
