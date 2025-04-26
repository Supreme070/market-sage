"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, User, LogOut, Search, Menu, X, Sun, Moon, Laptop } from "lucide-react";

export function DashboardHeader({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("marketSageAuth");
    router.push("/");
  };

  // cycle through system → light → dark
  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const renderThemeIcon = () => {
    if (theme === "system") return <Laptop className="h-5 w-5" />;
    if (theme === "light") return <Sun className="h-5 w-5" />;
    return <Moon className="h-5 w-5" />;
  };

  return (
    <header className="bg-card h-16 border-b flex items-center justify-between px-4 sticky top-0 z-30">
      {/* Left side: Menu toggle and search */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-muted md:hidden"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-[200px] lg:w-[300px]"
          />
        </div>
      </div>

      {/* Right side: Notifications, theme toggle, and user */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className="p-2 rounded-md hover:bg-muted"
          aria-label="Toggle theme"
        >
          {renderThemeIcon()}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-muted relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"></span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 text-sm p-1.5 rounded-md hover:bg-muted"
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden lg:inline-block">User</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
