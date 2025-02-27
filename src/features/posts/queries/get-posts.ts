import { initialPosts } from "@/data";
import { Post } from "@/features/posts/types";

export async function getPosts(): Promise<Post[]> {

  await new Promise(resolve => setTimeout(resolve, 1000))

  return new Promise(resolve => {
    resolve(initialPosts)
  });
}
