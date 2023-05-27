const { Storage } = require('@google-cloud/storage');
const CREDENTIALS = require('../key.json');
const storage = new Storage({
    projectId: CREDENTIALS.project_id,
    credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    }
});

const bucketName = 'journey-apis.appspot.com';

const uploadToGCS = async (file) => {
    const blob = storage.bucket(bucketName).file(Date.now() + file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('error', err => {
        console.log(err);
    });

    const promise = new Promise((resolve, reject) => {
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            resolve(publicUrl);
        });
        blobStream.on('error', err => {
            reject(err);
        });
        blobStream.end(file.buffer);
    });

    return promise;
}

module.exports = uploadToGCS;