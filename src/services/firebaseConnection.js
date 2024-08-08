import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFPeZu3B4Gansl6MKHguvlzzb9sBxZcIw",
  authDomain: "ticketsystem-b6cd6.firebaseapp.com",
  projectId: "ticketsystem-b6cd6",
  storageBucket: "ticketsystem-b6cd6.appspot.com",
  messagingSenderId: "786821113200",
  appId: "1:786821113200:web:5a63b6981ed16ef5451bb5",
  measurementId: "G-E9XXRYKYZ1",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
