"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-end space-x-2">
      <Switch
        type="button"
        id="theme-switcher"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="theme-switcher" className="capitalize">
        {theme}
      </Label>
    </div>
  );
}
