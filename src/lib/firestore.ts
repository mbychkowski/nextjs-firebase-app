import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

import config from "../../firebase.config.json" assert { type: "json" };

const firebaseConfig = {
  ...config
}

const app = initializeApp(firebaseConfig);

export const firestoreClient = getFirestore(app);

const globalForFirestore = globalThis as unknown as { firestore: Firestore }

if (process.env.NODE_ENV !== "production") {
  globalForFirestore.firestore = firestoreClient
}
