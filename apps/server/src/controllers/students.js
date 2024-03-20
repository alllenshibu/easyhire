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

const getStudentDetails = async (req, res) => {
  try {           
    const studentId = req?.params?.studentId;                                           
    const students = await prisma.students.findUnique({
      where: {
        id: studentId,
      },
    })
    return res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


module.exports = {
  getAllStudents,
  getStudentDetails,
};