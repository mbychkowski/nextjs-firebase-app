import { getPosts } from "../queries/get-posts";
import PostItem from "./post-item";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}