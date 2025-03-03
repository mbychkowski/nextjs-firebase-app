"use server"

import { deleteDoc, doc } from "firebase/firestore";
import { redirect } from "next/navigation";

import { firestoreClient } from "@/lib/firestore";
import { postsPath } from "@/path";

export const deletePost = async (id: string) => {
  console.log(id)
  await deleteDoc(doc(firestoreClient, "posts", id))

  redirect(postsPath())
}