const { Firestore } = require('@google-cloud/firestore');
const CREDENTIALS = require('./key.json');

const firestore = new Firestore({
    projectId: CREDENTIALS.project_id,
    credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    }
});

module.exports = firestore;