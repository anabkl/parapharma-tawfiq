import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVYKVHB0cqhL7gCsHVhjMeLDoRm5y_cSY",
  authDomain: "parapharma-tawfiq.firebaseapp.com",
  projectId: "parapharma-tawfiq",
  storageBucket: "parapharma-tawfiq.firebasestorage.app",
  messagingSenderId: "304679144459",
  appId: "1:304679144459:web:dfa204bcc2807107960b0e",
  measurementId: "G-MFDQPB4ZRD"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Export the services we need for the shop
export const auth = getAuth(app);       // For Login/Signup
export const db = getFirestore(app);    // For Products & Orders
export const analytics = getAnalytics(app); // For tracking views

export default app;
