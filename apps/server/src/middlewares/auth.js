const prisma = require("./../db");

//
// General auth
//
const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let user = await prisma.users.findUnique({
      where: {
        id: token,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const authorizeCompany = async (req, res, next) => {
  try {
    let user = req.user;

    if (!user.roles.find((role) => role === "COMPANY")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const company = await prisma.companies.findFirst({
      where: {
        adminId: user.id,
      },
    });

    user.company = company;
    req.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  authorize,
  authorizeCompany,
};
