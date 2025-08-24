// components/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAJEtaRwg3k9QBLYG5CpD0aXp_8unclO60",
//   authDomain: "mysmartpg-74c8e.firebaseapp.com",
//   projectId: "mysmartpg-74c8e",
//   storageBucket: "mysmartpg-74c8e.appspot.com",
//   messagingSenderId: "909667552478",
//   appId: "1:909667552478:web:be617c227d437aa1ab464f",
//   measurementId: "G-Z52PCG579V",
// };


const firebaseConfig = {
  apiKey: "AIzaSyAW4eHm5jmBFD_yaNd6AXyxXjA9QpIcOh8",
  authDomain: "mysmartpg-dbee4.firebaseapp.com",
  projectId: "mysmartpg-dbee4",
  storageBucket: "mysmartpg-dbee4.firebasestorage.app",
  messagingSenderId: "61662138871",
  appId: "1:61662138871:web:f3e18e3b41da916d11def2",
  measurementId: "G-9TH89R1KBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider, signInWithPopup };
