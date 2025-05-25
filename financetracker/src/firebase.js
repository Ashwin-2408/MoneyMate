// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCguetCCeibKk4U-UInC_L2hlARjMVmPio",
  authDomain: "moneymate-631b5.firebaseapp.com",
  projectId: "moneymate-631b5",
  storageBucket: "moneymate-631b5.firebasestorage.app",
  messagingSenderId: "606186720375",
  appId: "1:606186720375:web:5b3534673047aa737a0a72",
  measurementId: "G-1KGKCHZ87H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();
export{db,auth,provider,doc,setDoc};