import { notFound } from "next/navigation";

import PostItem from "@/features/posts/components/post-item";
import { getPost } from "@/features/posts/queries/get-post";

type PostPageProps = {
  params: Promise<{
    postId: string;
  }>
}

export default async function PostPage({ params }: PostPageProps) {

  const {postId} = await params;

  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <PostItem post={post} isDetail={true} />
    </div>
  )
}
