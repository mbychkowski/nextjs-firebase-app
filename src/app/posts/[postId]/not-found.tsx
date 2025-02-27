import Link from "next/link";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { postsPath } from "@/path";

export default function NotFound() {
  return (
    <Placeholder
      label="Post not found"
      button={
        <Button asChild variant="outline">
          <Link href={postsPath()}>Back to posts</Link>
        </Button>
      }>

    </Placeholder>
  )
}
