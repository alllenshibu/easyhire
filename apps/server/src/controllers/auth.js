const prisma = require("../db");

const signupCoordinator = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const userExists = await prisma.coodinators.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists", success: false });
    }

    const user = await prisma.coodinators.create({
      data: {
        email,
        password,
        firstName,
        lastName,
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

const signupStudent = async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;

    if (!email || !phone || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    let userExists = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists", success: false });
    }

    userExists = await prisma.students.findUnique({
      where: {
        phone,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this phone already exists", success: false });
    }

    const user = await prisma.students.create({
      data: {
        email,
        phone,
        password,
        firstName,
        lastName,
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

const loginCoordinator = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields", success: false });
    }

    const user = await prisma.coodinators.findUnique({
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

const loginStudent = async (req, res) => {
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
    return res
      .status(500)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  signupCoordinator,
  signupStudent,
  loginCoordinator,
  loginCompany,
  loginStudent,
};
