import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "FILL_ME",
  authDomain: "FILL_ME.firebaseapp.com",
  projectId: "mata3m-ly",
  storageBucket: "FILL_ME.appspot.com",
  messagingSenderId: "FILL_ME",
  appId: "FILL_ME"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
