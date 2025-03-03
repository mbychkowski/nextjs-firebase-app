import { collection, getDocs } from "firebase/firestore";

import { Post } from "@/features/posts/types";
import { firestoreClient } from "@/lib/firestore";

const COLLECTION = "posts"

export async function getPost(postId: string): Promise<Post | null> {
  const querySnapshot = await getDocs(collection(firestoreClient, COLLECTION));

  const maybePost = querySnapshot.docs.find(doc => doc.data().id === postId)?.data() as Post;

  return maybePost || null
}
