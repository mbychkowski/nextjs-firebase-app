import { ThemeProvider as BaseThemeProvider, ThemeProviderProps as BaseThemeProviderProps } from "next-themes";

type ThemeProviderProps = BaseThemeProviderProps

export default function ThemeProvider({ children }: ThemeProviderProps) {

  return (
    <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemeProvider>
  )
}
