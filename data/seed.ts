import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";

import { Post } from "@/features/posts/types";
import { readFileSync } from "fs";

const firebaseConfigJson = readFileSync("firebase.json", "utf-8")

const config = JSON.parse(firebaseConfigJson)

const firebaseConfig = {
  ...config
}

const app = initializeApp(firebaseConfig);

export const initialPosts: Post[] = [
  {
    id: "1",
    title: "First Post",
    imageUrl: "/images/placeholder.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the first post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "2",
    title: "Second Post",
    imageUrl: "/images/placeholder2.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder2-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the second post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: "3",
    title: "Third Post",
    imageUrl: "/images/placeholder3.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder3-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the third post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
];

const db = getFirestore(app);

const seed = async () => {

  for (const post of initialPosts) {
    try {
      await setDoc(doc(db, "posts", post.id), post);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

seed();