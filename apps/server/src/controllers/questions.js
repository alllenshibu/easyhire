const prisma = require("../db");
const { QuestionType } = require("@prisma/client");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.questions.findMany({
      include: {
        company: true,
      },
    });

    return res.status(200).json({ questions, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getQuestionsByCompany = async (req, res) => {
  try {
    const { companyId } = req.body;

    const questions = await prisma.questions.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
      },
    });

    return res.status(200).json({ questions, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.body;

    const question = await prisma.questions.findFirst({
      where: {
        id: questionId,
      },
      include: {
        company: true,
      },
    });

    return res.status(200).json({ question, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const addNewQuestion = async (req, res) => {
  try {
    const { questionType } = req.query;
    const { companyId, question, options, answer } = req.body;

    if (!companyId || !question) {
      return res.status(400).json({
        error: "Company ID and question are required",
        success: false,
      });
    }

    switch (questionType) {
      case QuestionType.MCQ:
        if (!options || !answer) {
          return res
            .status(400)
            .json({ error: "Options and answer are required", success: false });
        }

        if (!Array.isArray(options) || options.length < 2) {
          return res.status(400).json({
            error: "Options should be an array with at least 2 options",
            success: false,
          });
        }

        const newMCQQuestion = await prisma.questions.create({
          data: {
            companyId,
            question,
            options,
            answer,
            questionType,
          },
        });

        if (!newMCQQuestion)
          return res
            .status(500)
            .json({ error: "Failed to create question", success: false });

        return res
          .status(200)
          .json({ question: newMCQQuestion, success: true });

      case QuestionType.CODING:
        newCodingQuestion = await prisma.questions.create({
          data: {
            companyId,
            question,
            questionType,
          },
        });

        if (!newCodingQuestion)
          return res
            .status(500)
            .json({ error: "Failed to create question", success: false });

        return res
          .status(200)
          .json({ question: newCodingQuestion, success: true });

      default:
        return res
          .status(400)
          .json({ error: "Invalid question type", success: false });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionsByCompany,
  getQuestionById,
  addNewQuestion,
};
