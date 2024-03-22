const prisma = require("../db");

const getAllProblems = async (req, res) => {
  try {
    const problems = await prisma.problems.findMany({
      include: {
        company: true,
      },
    });

    return res.status(200).json({ problems, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getProblemById = async (req, res) => {
  try {
    const { problemId } = req.body;

    const problem = await prisma.problems.findFirst({
      where: {
        id: problemId,
      },
      include: {
        company: true,
      },
    });

    return res.status(200).json({ problem, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getProblemsByCompany = async (req, res) => {
  try {
    const { companyId } = req.body;

    const company = await prisma.companies.findFirst({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res
        .status(404)
        .json({ error: "Company not found", success: false });
    }

    const problems = await prisma.problems.findMany({
      where: {
        companyId,
      },
    });

    return res.status(200).json({ problems, company, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const addNewProblem = async (req, res) => {
  try {
    const { companyId, question, description } = req.body;

    if (!companyId || !question || !description) {
      return res.status(400).json({
        error: "Missing fields",
        success: false,
      });
    }

    const newProblem = await prisma.problems.create({
      data: {
        question,
        description,
        companyId,
      },
    });

    if (!newProblem) {
      return res
        .status(500)
        .json({ error: "Something went wrong", success: false });
    }

    return res.status(201).json({ problem: newProblem, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  getAllProblems,
  getProblemById,
  getProblemsByCompany,
  addNewProblem,
};
