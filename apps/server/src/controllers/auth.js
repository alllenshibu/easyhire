const prisma = require("./../db");

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const userExists = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists", success: false });
    }

    const user = await prisma.students.create({
      data: {
        email,
        password,
        name,
      },
    });

    if (!user) {
      return res
        .status(500)
        .json({ error: "User not created", success: false });
    }

    return res.status(200).json({ token: user.id, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const user = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found", success: false });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ error: "Invalid password", success: false });
    }

    return res.status(200).json({ token: user.id, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = {
  signup,
  login,
};
