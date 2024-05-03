const dotenv = require("dotenv");

const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config();

const s3Client = new S3Client({
  endpoint: process.env.S3_BUCKET_ENDPOINT,
  forcePathStyle: false,
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_BUCKET_ACCESS_KEY_SECRET,
  },
});

const uploadObject = async (params) => {
  // console.log(
  //    "Starting object upload to S3 bucket: " + params.Bucket + "/" + params.Key
  // );
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    // console.log(
    // "Successfully uploaded object: " + params.Bucket + "/" + params.Key
    //  );
    // console.log("Response data:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getPublicUrl = (key) => {
  return process.env.S3_BUCKET_PUBLIC_ENDPOINT + "/" + key;
};

module.exports = { getPublicUrl };

module.exports = {
  uploadObject,
  getPublicUrl,
};
