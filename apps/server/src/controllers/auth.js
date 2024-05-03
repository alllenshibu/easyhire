const prisma = require("../db");

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !lastName || !phone) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const userExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists", success: false });
    }

    const user = await prisma.users.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
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
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
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

    const user = await prisma.users.findUnique({
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
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const user = await prisma.companies.findUnique({
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
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  signup,
  login,
  loginCompany,
};
