// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth();
const db: Firestore = getFirestore(app);


export { auth, db };