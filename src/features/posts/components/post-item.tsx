import clsx from "clsx";
import { LucideArrowBigDown, LucideArrowBigUp, LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { postPath } from "@/path";

import { deletePost } from "../actions/delete-tickets";
import { Post } from "../types";

type PostItemProps = {
  post: Post;
  isDetail?: boolean;
}

export default function PostItem({ post, isDetail = false}: PostItemProps) {

  const upvoteButton = (
    <>
      <Button variant="outline" size="icon">
        <div className="flex flex-col items-center">
          <LucideArrowBigUp className="h-4 w-4" />
          <div className="text-xs font-light text-muted-foreground">{post.upvotes}</div>
        </div>
      </Button>
      <Button variant="outline" size="icon">
        <div className="flex flex-col items-center">
          <div className="text-xs font-light text-muted-foreground">{post.downvotes}</div>
          <LucideArrowBigDown className="h-4 w-4" />
        </div>
      </Button>
    </>
  )

  const detailButton = (
    <Button variant="ghost" size="icon">
      <Link href={postPath(post.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  )

  const deleteButton = (
    <form action={deletePost.bind(null, post.id)}>
      <Button variant="ghost" size="icon">
        <LucideTrash className="h-4 w-4" />
      </Button>
    </form>
  )

  return (
    <div className={clsx("w-full flex gap-x-1", {
      "max-w-[580px]": isDetail,
      "max-w-[420px]": !isDetail
    })}>
      {
        !isDetail &&
        <div className="flex flex-col justify-between items-center gap-y-1">
          {upvoteButton}
        </div>
      }
      <Card className="w-full relative">

        <div className="absolute top-0 right-0">
          {isDetail ? deleteButton : detailButton}
        </div>
        <div className="flex items-center">
          <CardContent className="p-6">
            <div className="flex gap-x-2">
              <div className="h-16 w-16 bg-sky-500" />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.description}</CardDescription>
          </CardHeader>
        </div>
        <CardFooter className="flex flex-row items-center text-xs font-light text-muted-foreground">
          {post.createdAt.toDate().toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  )
}