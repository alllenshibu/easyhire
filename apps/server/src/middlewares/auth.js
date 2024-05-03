const prisma = require("./../db");

//
// General auth
//
const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization[0].split(" ")[1];

    console.log(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let user = await prisma.users.findUnique({
      where: {
        id: token,
      },
    });

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
};
