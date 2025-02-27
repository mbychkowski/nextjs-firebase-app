import { Suspense } from "react";

import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import PostList from "@/features/posts/components/post-list";

export default function PostsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="🗒" description="Hot posts!" />

      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  )
}