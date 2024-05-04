const prisma = require("../db");

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

const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.body;

    const question = await prisma.questions.findFirst({
      where: {
        id: questionId,
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

//
// Tests
//
const addNewTest = async (req, res) => {
  try {
    const { testName, questions } = req.body;

    if (!testName) {
      return res
        .status(400)
        .json({ error: "Test name is required", success: false });
    }

    if (!questions) {
      return res
        .status(400)
        .json({ error: "Questions are required", success: false });
    }

    if (!Array.isArray(questions)) {
      return res
        .status(400)
        .json({ error: "Questions should be an array", success: false });
    }

    const newTest = await prisma.tests.create({
      data: {
        name: testName,
      },
    });

    if (!newTest) {
      return res.status(500).json({
        error: "Could not create test",
        success: false,
      });
    }

    for (let i = 0; i < questions.length; i++) {
      console.log(questions[i], questions.length);
      const question = questions[i];
      if (!question.question || !question.options) {
        console.log("Question, options, and answer are required", question);
        return res.status(400).json({
          error: "Question, options, and answer are required",
          success: false,
        });
      }

      await prisma.$transaction(async (tx) => {
        //
        // Number of options should be 4
        //
        if (!Array.isArray(question.options) || question.options.length !== 4) {
          return res.status(400).json({
            error: "Options should be an array with 4 elements",
            success: false,
          });
        }

        let newQuestion = await tx.questions.create({
          data: {
            question: question.question,
            options: question.options,
            answer: Number(question.answer),
          },
        });

        if (!newQuestion) {
          return res.status(500).json({
            error: "Could not add question",
            success: false,
          });
        }

        const newTestQuestion = await tx.testQuestions.create({
          data: {
            testId: newTest.id,
            questionId: newQuestion.id,
          },
        });

        if (!newTestQuestion) {
          return res.status(500).json({
            error: "Could not add question to test",
            success: false,
          });
        }
      });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getAllTests = async (req, res) => {
  try {
    let tests = await prisma.tests.findMany({
      include: {
        _count: {
          select: {
            testQuestions: true,
          },
        },
      },
    });

    tests = tests.map((test) => {
      return {
        id: test.id,
        name: test.name,
        numberOfQuestions: test._count.testQuestions,
      };
    });

    return res.status(200).json({ tests, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const getTestById = async (req, res) => {
  try {
    const { testId } = req.params;

    let test = await prisma.tests.findFirst({
      where: {
        id: testId,
      },
      include: {
        testQuestions: {
          select: {
            question: true,
          },
        },
      },
    });

    test.questions = test.testQuestions.map(({ question }) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      answer: question.answer,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));

    delete test.testQuestions;

    return res.status(200).json({ test, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  addNewTest,
  getAllTests,
  getTestById,
};
