<<<<<<< Updated upstream
const prisma = require("./../db");

const getUserDetails = async (req, res) => {
  try {
    let userDetails = await prisma.students.findMany({});

    if (!userDetails) {
      return res
        .status(500)
        .json({ error: "Something went wrong", success: false });
    }

    userDetails = userDetails[0];

    return res.status(200).json({ user: userDetails, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = { getUserDetails };
=======
const prisma = require("./../db");

const getUserDetails = async (req, res) => {
  try {
    const { user } = req;

    const userDetails = await prisma.users.findUnique({
      where: {
        id: token,
      },
    });

    if (!userDetails) {
      return res
        .status(500)
        .json({ error: "Something went wrong", success: false });
    }

    return res.status(200).json({ userDetails, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = { getUserDetails };
>>>>>>> Stashed changes
