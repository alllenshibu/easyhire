const prisma = require("./../db");

//
// General auth
//
const authorize = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const authorizeCoordinator = async (req, res, next) => {
  try {
    let user = await prisma.coodinators.findMany({});

    user = user[0];

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
    let user = await prisma.companies.findMany({});

    user = user[0];

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

module.exports = {
  authorize,
  authorizeCoordinator,
  authorizeCompany,
};
