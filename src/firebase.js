// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Firebase configuration (из вашего Firebase проекта)
const firebaseConfig = {
apiKey: "AIzaSyC5MRLTqK3zlnRSpeZJbkhZrsQuM5Fxwko",
  authDomain: "speech-ai-52f16.firebaseapp.com",
  projectId: "speech-ai-52f16",
  storageBucket: "speech-ai-52f16.appspot.com",
  messagingSenderId: "429266010756",
  appId: "1:429266010756:web:d02949a105c19f5cea38d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
