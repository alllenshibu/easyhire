const prisma = require("./../db");

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.students.create({
      data: {
        email,
        password,
        name,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not created" });
    }

    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.status(200).json({ token: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
