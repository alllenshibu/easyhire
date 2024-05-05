const prisma = require("../../db");

const getNotifications = async (req, res) => {
  try {
    const currentDate = new Date();

    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 5);

    const openings = await prisma.openings.findMany({
      where: {
        deadline: {
          gte: currentDate,
          lte: futureDate,
        },
      },
      include: {
        company: true,
      },
      orderBy: {
        deadline: "asc",
      },
      take: 6,
    });

    const applications = await prisma.applications.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        opening: {
          include: {
            company: true,
          },
        },
      },
    });

    return res.status(200).json({ openings, applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNotifications };
