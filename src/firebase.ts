import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8h58fOTSNgaQqmB09-dbcFO3Q-MDvNYM",
  authDomain: "agronexusbd-ba5ea.firebaseapp.com",
  projectId: "agronexusbd-ba5ea",
  storageBucket: "agronexusbd-ba5ea.firebasestorage.app",
  messagingSenderId: "54552205337",
  appId: "1:54552205337:web:fa06918ff64f2de997b288",
  measurementId: "G-ZKY31HMGTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);