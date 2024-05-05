const prisma = require("../db");

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await prisma.attempts.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        test: true,
      },
    });

    // Return the fetched attempts data in a JSON response
    return res.status(200).json({
      attempts,
      success: true,
    });
  } catch (err) {
    console.error(err);
    // Return an error response in case of failure
    return res.status(500).json({
      error: "Something went wrong while fetching attempts data",
      success: false,
    });
  }
};

module.exports = {
  getAllAttempts,
};
