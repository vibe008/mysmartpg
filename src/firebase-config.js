// components/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJEtaRwg3k9QBLYG5CpD0aXp_8unclO60",
  authDomain: "mysmartpg-74c8e.firebaseapp.com",
  projectId: "mysmartpg-74c8e",
  storageBucket: "mysmartpg-74c8e.appspot.com",
  messagingSenderId: "909667552478",
  appId: "1:909667552478:web:be617c227d437aa1ab464f",
  measurementId: "G-Z52PCG579V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider, signInWithPopup };
