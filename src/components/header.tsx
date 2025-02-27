import Link from "next/link";

import { homePath, postsPath } from "@/path";

import ThemeSwitcher from "./theme/theme-swithcer";
import { buttonVariants } from "./ui/button";

export default function Header() {
  return (
    <nav className="
      supports-backdrop-blur:bg-background/60
      fixed left-0 right-0 top-0 z-20
      border-b bg-background/95 backdrop-blur
      w-full flex py-2.5 px-5 justify-between">
      <div className="flex gap-x-2">
        <Link href={homePath()} className={buttonVariants({variant: "ghost"})}>
          <h1 className="ml-2 text-lg font-semibold">
            <span>🔥 </span>
            <span>Fire Posts</span>
          </h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        <Link href={postsPath()} className={buttonVariants({variant: "default"})}>
          Posts
        </Link>
      </div>
    </nav>
  )
}