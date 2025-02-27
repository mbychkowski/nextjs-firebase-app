import { initialPosts } from "@/data";
import { Post } from "@/features/posts/types";

export async function getPost(postId: string): Promise<Post | null> {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const maybePost = initialPosts.find(post => post.id === postId);

  return new Promise(resolve => {
    resolve(maybePost || null)
  });
}
