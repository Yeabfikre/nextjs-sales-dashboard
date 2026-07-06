"use client";

import { Search, Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex w-full bg-card border-b border-card-border h-20">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        
        {/* Search Input */}
        <div className="hidden sm:block flex-grow">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <input
              type="text"
              placeholder="Search or type command..."
              className="w-full bg-transparent pl-9 pr-4 text-foreground focus:outline-none xl:w-125"
            />
          </div>
        </div>

        {/* Right Area */}
        <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Theme Toggle */}
            <li>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-primary transition-colors"
              >
                {mounted && theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            </li>

            {/* Notification */}
            <li>
              <button className="relative flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-primary transition-colors">
                <span className="absolute -top-0.5 right-0 z-10 h-2 w-2 rounded-full bg-destructive inline-block">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                </span>
                <Bell size={20} />
              </button>
            </li>
          </ul>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-foreground">
                Musharof
              </span>
            </span>
            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden flex items-center justify-center">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
