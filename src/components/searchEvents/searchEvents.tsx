"use client";

import { useState, useEffect } from "react";

interface EventItem {
  id: number;
  title: string;
  description?: string;
  datetime?: string;
  price?: number;
  category?: string;
}

export default function SearchEvents() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Используем уже существующий /api/events
        const res = await fetch(`/api/events?title=${query}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
      } finally {
        setLoading(false);
      }
    };

    // Задержка 300 мс, чтобы не спамить запросами при вводе
    const timeout = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Search events..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Результаты */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-300 rounded-xl p-6 bg-gray-50 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              {event.category && (
                <p className="text-sm text-gray-600 mb-1">
                  Category: {event.category}
                </p>
              )}
              {event.datetime && (
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(event.datetime).toLocaleDateString()}
                </p>
              )}
              {event.price !== undefined && (
                <p className="text-sm text-gray-700 mb-2">
                  Price: €{event.price}
                </p>
              )}
              {event.description && (
                <p className="text-sm text-gray-700">
                  {event.description.slice(0, 80)}...
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events found.</p>
      )}
    </section>
  );
}
