import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "yt-clone-lama.firebaseapp.com",
  projectId: "yt-clone-lama",
  storageBucket: "yt-clone-lama.appspot.com",
  messagingSenderId: "575904821314",
  appId: "1:575904821314:web:161d381c6dd3ab4c997ddb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
