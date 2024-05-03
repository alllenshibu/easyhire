const fs = require("fs");

const prisma = require("../db");
const { uploadObject, getPublicUrl } = require("../utils/fileUpload");

const uploadResume = async (req, res) => {
  try {
    const { user } = req;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userExists = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const file = fs.readFileSync(req.file.path);

    const uploadResponse = await uploadObject({
      Bucket: "easyhire-spaces",
      Key: `resumes/${user.id}.pdf`,
      Body: file,
      ACL: "public-read",
      Metadata: {
        "x-amz-meta-my-key": "your-value",
      },
      ContentType: "application/pdf",
    });

    if (!uploadResponse) {
      return res.status(500).json({ error: "Failed to upload resume" });
    }

    if (uploadResponse.$metadata.httpStatusCode !== 200) {
      console.log(uploadResponse);
      return res.status(500).json({ error: "Failed to upload resume" });
    }

    fs.unlinkSync(req.file.path);

    const updateduser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        resume: getPublicUrl(`resumes/${user.id}.pdf`),
      },
    });

    return res.status(200).json(updateduser);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  uploadResume,
};
