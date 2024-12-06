import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQ_ofN5jSRKowex_O0hrKpeAG5yr_smnw",
    authDomain: "chat-app-f6f7a.firebaseapp.com",
    projectId: "chat-app-f6f7a.firebasestorage.app",
    storageBucket: "chat-app-f6f7a.firebasestorage.app",
    messagingSenderId: "908700951146",
    appId: "1:908700951146:web:4b7ca41a4e2aceca362013"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
