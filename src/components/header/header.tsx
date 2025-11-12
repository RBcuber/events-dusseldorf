"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoogleSignIn from "../google-sign-in";
import SearchBar from "../search-bar/search-bar";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/help", label: "FAQ" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="flex justify-between items-center px-10 py-4 sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-accent" />
          <span className="text-lg font-medium text-dark">
            <Link href="/">
              Event <b>Düsseldorf</b>
            </Link>
          </span>
        </div>

        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-accent transition ${
                pathname === link.href ? "text-accent" : "text-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <SearchBar />
        <Link
          href="/events/new"
          className="px-4 py-2 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium"
        >
          Create Event
        </Link>
        <GoogleSignIn />
      </div>
    </header>
  );
}
