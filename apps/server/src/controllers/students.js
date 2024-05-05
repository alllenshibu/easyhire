const prisma = require("../db");

const getAllStudents = async (req, res) => {
  try {
    // Add role check
    const students = await prisma.users.findMany({});
    return res.json({ students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const addNewStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const student = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phone,
      },
    });
    return res.status(200).json({ student });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllStudents,
  addNewStudent,
};
