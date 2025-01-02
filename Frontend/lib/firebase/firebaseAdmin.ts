// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Only initialize Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
    const serviceAccount = require('./serviceaccount.dev.json'); // Replace with your service account path

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Optional: add other configurations like databaseURL if needed
    });
} else {
    admin.app(); // Use the default app if already initialized
}

export default admin;