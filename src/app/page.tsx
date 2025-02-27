import Link from "next/link";

import Heading from "@/components/heading";
import { postsPath } from "@/path";


export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="🏠" description="No place like home."/>

      <div className="flex-1 flex flex-col items-center">
        <Link href={postsPath()} className="underline">posts</Link>
      </div>
    </div>
  )
}