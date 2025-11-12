"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (search.trim().length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/events?title=${encodeURIComponent(search.trim())}`);
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  // ⌨️ Обработка Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();
      window.location.href = `/events?title=${encodeURIComponent(search.trim())}`;
      setShowResults(false);
    }
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search events..."
        className="bg-bg-light text-dark px-4 py-2 rounded-lg outline-none w-56 focus:bg-neutral transition"
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
    </div>
  );
}
