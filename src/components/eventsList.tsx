"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EventItem {
  id: number;
  title: string;
  description?: string;
}

export default function EventsList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("title") || ""; // берем ?title из URL
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/events${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ""}`
        );
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  if (events.length === 0)
    return <p className="text-gray-500 text-center">No events found.</p>;

  return (
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
