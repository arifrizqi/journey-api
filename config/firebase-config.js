// const { Firestore } = require('@google-cloud/firestore');
// const CREDENTIALS = require('./key.json');

// const firestore = new Firestore({
//     projectId: CREDENTIALS.project_id,
//     credentials: {
//         client_email: CREDENTIALS.client_email,
//         private_key: CREDENTIALS.private_key
//     }
// });

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = firestore;