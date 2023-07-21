import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh377wz1P0ISt_Qht-AY7smme9dB6XycA",
  authDomain: "testdeltaexchange-6ea5f.firebaseapp.com",
  projectId: "testdeltaexchange-6ea5f",
  storageBucket: "testdeltaexchange-6ea5f.appspot.com",
  messagingSenderId: "276939666943",
  appId: "1:276939666943:web:32fbbedb4fffc4594ba3ca",
  measurementId: "G-0JEPDQXJCM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
