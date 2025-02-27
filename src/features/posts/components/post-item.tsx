import clsx from "clsx";
import { LucideArrowBigDown, LucideArrowBigUp, LucideSquareArrowOutUpRight } from "lucide-react";
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

import { Post } from "../types";

type PostItemProps = {
  post: Post;
  isDetail?: boolean;
}

export default function PostItem({ post, isDetail }: PostItemProps) {

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
    <Button variant="ghost" size="icon" asChild>
      <Link href={postPath(post.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
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
        {
          !isDetail &&
          <div className="absolute top-0 right-0">
            {detailButton}
          </div>

        }
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
          {post.createdAt.toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  )
}