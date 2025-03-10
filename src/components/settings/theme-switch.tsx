"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/src/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ThemeSwitchProps {
  variant?: "icon" | "switch";
  className?: string;
}

export function ThemeSwitch({
  variant = "switch",
  className,
}: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={1000}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full w-fit hover:bg-muted transition-colors",
                className,
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>¿Deseas cambiar el tema?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Sun className="h-4 w-4" />
      <Switch
        id="theme-switcher"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
}
