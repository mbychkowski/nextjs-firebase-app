import { Post } from "@/features/posts/types";
import { firestoreClient } from "@/lib/firestore";

const COLLECTION = "posts"

import { collection, getDocs } from "firebase/firestore";

export async function getPosts(): Promise<Post[]> {

  const querySnapshot = await getDocs(collection(firestoreClient, COLLECTION))

  return querySnapshot.docs.map(doc => doc.data() as Post)
}
