"use client"

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const {theme, setTheme} = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LucideSun className="h-4 w-4 rotate-0 scale-100 transistion-all dark:-rotate-90 dark:scale-0" />
      <LucideMoon className="absolute h-4 w-4 rotate-90 scale-0 transistion-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
