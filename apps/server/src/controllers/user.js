const prisma = require("./../db");

const getUserDetails = async (req, res) => {
  try {
    const { user } = req;

    const userDetails = await prisma.students.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userDetails) {
      return res
        .status(500)
        .json({ error: "Something went wrong", success: false });
    }

    return res.status(200).json({ user: userDetails, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = { getUserDetails };
