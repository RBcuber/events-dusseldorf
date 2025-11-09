"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/about", label: "About" },
    { href: "/help", label: "FAQ" },
    { href: "/events", label: "Events" },
    { href: "/events/new", label: "Create Event" },
    { href: "/profile", label: "Profile" },

  ];

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight from-pink-500 to-purple-500 bg-clip-text text-highlight hover:opacity-80 transition-opacity"
          >
            Events Dusselorf
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-pink-400"
                    : "text-foreground hover:text-pink-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden mt-2 pb-4 flex flex-col space-y-2 border-t border-border pt-2 animate-fadeIn">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-pink-400"
                    : "text-foreground hover:text-pink-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
