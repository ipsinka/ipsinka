"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react"; // Íconos bonitos
import { Button } from "./ui/button"; // Botón estilizado de shadcn
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // O un loader, o solo el botón sin icono

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      className="w-10 h-10 p-0 rounded-full bg-gray-900 text-white dark:bg-yellow-500 dark:text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
