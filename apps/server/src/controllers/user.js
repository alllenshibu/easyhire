const prisma = require("./../db");

const getUserDetails = async (req, res) => {
  try {
    const { user } = req;

    const userDetails = await prisma.users.findUnique({
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

const editUser = async (req, res) => {
  try {
    const { user } = req;
    const { firstName, lastName, email, password, phone, cgpa, stream, year } =
      req.body;

    const updatedUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
        phone,
        cgpa: parseFloat(cgpa),
        stream,
        year,
      },
    });

    if (!updatedUser) {
      return res.status(500).json({
        error: "Something went wrong",
        success: false,
      });
    }

    return res.status(200).json({ user: updatedUser, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = { getUserDetails, editUser };
