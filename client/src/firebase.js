import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEyTIqnuNCdZ7VkMnGiiaDzE6L_KHCs7E",
  authDomain: "jpmccfg24.firebaseapp.com",
  projectId: "jpmccfg24",
  storageBucket: "jpmccfg24.appspot.com",
  messagingSenderId: "398899223005",
  appId: "1:398899223005:web:49f96b9008481133963e34",
  measurementId: "G-EXZ88B3VC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);