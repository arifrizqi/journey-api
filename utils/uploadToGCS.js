'use strict'
require('dotenv').config()
const {
    Storage
} = require('@google-cloud/storage')
const {
    v4: uuidv4
} = require('uuid');
const path = require('path');
const pathKey = path.resolve('../key.json')
const gcs = new Storage({
    projectId: pathKey.project_id,
    keyFilename: pathKey
})

const bucketName = "journey-bangkit"
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {}

ImgUpload.uploadToGcs = (req, res, next) => {
    if (!req.file) return next()
    const originalExtension = path.extname(req.file.originalname)
    const gcsname = uuidv4() + originalExtension
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })

    stream.end(req.file.buffer)
}

module.exports = ImgUpload