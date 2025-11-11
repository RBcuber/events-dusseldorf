"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/help", label: "FAQ" },
    { href: "/profile", label: "Profile" },
  ];

 
  useEffect(() => {
    const fetchEvents = async () => {
      if (search.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(`/api/events?title=${encodeURIComponent(search)}`);
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
      }
    };

    const delay = setTimeout(fetchEvents, 300);
    return () => clearTimeout(delay);
  }, [search]);

 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/events?title=${encodeURIComponent(search.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-10 py-4 sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Левая часть */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-accent" />
          <span className="text-lg font-medium text-dark">
            <Link href={"/"}>Event <b>Dusseldorf</b></Link>
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

     
      <div className="relative flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search events..."
          className="bg-bg-light text-dark px-4 py-2 rounded-lg outline-none w-48 focus:bg-neutral transition"
        />

       
        {showResults && results.length > 0 && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {results.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block px-3 py-2 text-sm hover:bg-gray-100 transition"
              >
                {event.title}
              </Link>
            ))}
          </div>
        )}

       
        {showResults && search && results.length === 0 && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 px-3 py-2 text-sm text-gray-500">
            No events found
          </div>
        )}

        <Link
          href="/events/new"
          className="px-4 py-2 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium"
        >
          Create Event
        </Link>

        <Link
          href="/signup"
          className="px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

