const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const path = require('path');

const gcs = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

const ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();
  const originalExtension = path.extname(req.file.originalname);
  const gcsname = `${uuidv4()}${originalExtension}`;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
