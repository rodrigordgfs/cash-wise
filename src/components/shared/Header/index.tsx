"use client";

import { useMenu } from "@/context/menuContext";
import { useSidebar } from "@/context/sidebarContext";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "shinodalabs-ui";
import { LogoButton } from "../LogoButton";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleMobileMenu } = useMenu();
  const { toggleSidebar } = useSidebar();

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <div className="flex h-14 items-center pl-4 pr-6">
        <div className="space-x-2 flex items-center">
          <div className="hidden md:block">
            <IconButton icon={Menu} name="Menu" onClick={toggleSidebar} />
          </div>
          <div className="md:hidden">
            <IconButton icon={Menu} name="Menu" onClick={toggleMobileMenu} />
          </div>
          <LogoButton />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <IconButton
            onClick={toggleDarkMode}
            icon={darkMode ? Sun : Moon}
            name="Toggle theme"
          />
        </div>
      </div>
    </header>
  );
};
