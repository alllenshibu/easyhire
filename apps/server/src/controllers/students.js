const prisma = require("../db");

const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    return res.json({ students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllStudents,
}