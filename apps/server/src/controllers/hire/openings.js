const prisma = require("../../db");

const hireGetAllOpenings = async (req, res) => {
  try {
    const openings = await prisma.openings.findMany({
      where: {
        companyId: req.user.company?.id,
      },
      include: { applications: true },
    });

    console.log(req.user);
    console.log(openings);

    return res.json({ openings, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

const hireGetOpeningById = async (req, res) => {
  try {
    const { openingId } = req.params;

    if (!openingId) {
      return res.status(400).json({ error: "Opening ID is required" });
    }

    let opening = await prisma.openings.findUnique({
      where: { id: openingId },
      include: {
        company: true,
        applications: {
          include: { user: true },
        },
      },
    });

    if (!opening) {
      return res.status(404).json({ error: "Opening not found" });
    }

    return res.json({ opening, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, success: false });
  }
};

module.exports = {
  hireGetAllOpenings,
  hireGetOpeningById,
};
