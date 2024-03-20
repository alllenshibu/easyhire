const prisma = require("../db");

const addNewProfile = async (req, res) => {
    try {
        const {bio,studentId} = req.body
          const newProfile = await prisma.profiles.create({
            data: {
              studentId,
              bio,
            },
          });
          if (!newProfile) {
            return res
              .status(500)
              .json({ error: "No new profile created", success: false });
          }
      
        return res.status(200).json({newProfile, success: true })

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  };
  const getProfiles = async (req, res) => {
    try {           
      const studentId = req?.params?.studentId;                                           
      const profiles = await prisma.profiles.findMany({
        where: {
          studentId,
        },
      })
      return res.status(200).json({ profiles });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };


  module.exports={
    addNewProfile,
    getProfiles,
  }