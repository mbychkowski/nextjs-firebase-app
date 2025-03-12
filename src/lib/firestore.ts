import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { readFileSync } from "fs";

const firebaseConfigJson = readFileSync("firebase.json", "utf-8")

console.log(JSON.parse(firebaseConfigJson))

const config = JSON.parse(firebaseConfigJson)

const firebaseConfig = {
  ...config
}

const app = initializeApp(firebaseConfig);

const globalForFirestore = globalThis as unknown as { firestore: Firestore }

export const firestoreClient =
  globalForFirestore.firestore || getFirestore(app);

if (process.env.NODE_ENV !== "production") {
  globalForFirestore.firestore = firestoreClient
}
