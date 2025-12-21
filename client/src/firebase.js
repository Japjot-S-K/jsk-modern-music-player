import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFzR-53OLiVgjua_hhtZ7m-QA9QwdBrAE",
  authDomain: "music-player-c8021.firebaseapp.com",
  projectId: "music-player-c8021",
  storageBucket: "music-player-c8021.firebasestorage.app",
  messagingSenderId: "384883718684",
  appId: "1:384883718684:web:3e474446f9968ece017dd9"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
