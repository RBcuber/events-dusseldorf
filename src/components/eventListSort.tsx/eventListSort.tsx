"use client";
import { useFilters } from "@/src/hooks/useFilters";
import Events from "@/src/types/Events";
import Link from "next/link";
import { useEffect, useState } from "react";

function EventListSort() {
  const { filters, setFilters } = useFilters();
  const [events, setEvents] = useState<Events[]>([]);

  // Завантаження подій
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  // Підвантаження з API при зміні фільтрів
  useEffect(() => {
    async function fetchFiltered(filters = {}) {
      const params = new URLSearchParams(filters as Record<string, string>).toString();
      const res = await fetch(`/api/events?${params}`);
      const data = await res.json();
      setEvents(data);
    }

    fetchFiltered(filters);
  }, [filters]);

  // Унікальні значення для селектів з ID
  const uniqueCategories = events.reduce<{ id: string; category: string }[]>(
    (acc, e) => {
      if (!acc.some((x) => x.category === e.category)) {
        acc.push({ id: e.id, category: e.category });
      }
      return acc;
    },
    []
  );

  const uniqueLocations = events.reduce<{ id: string; location: string }[]>(
    (acc, e) => {
      if (!acc.some((x) => x.location === e.location)) {
        acc.push({ id: e.id, location: e.location });
      }
      return acc;
    },
    []
  );

  const uniqueDates = events.reduce<{ id: string; date: string }[]>(
    (acc, e) => {
      const date = new Date(e.datetime).toISOString().split("T")[0];
      if (!acc.some((x) => x.date === date)) {
        acc.push({ id: e.id, date });
      }
      return acc;
    },
    []
  );

  // Генерація інтервалів для цін
  const maxPriceValue = Math.max(...events.map((e) => e.price || 0), 100);
  const priceSteps = Array.from({ length: Math.ceil(maxPriceValue / 5) + 1 }, (_, i) => i * 5);

  return (
    <div className="bg-white p-4 m-4 rounded-2xl">
      {/* ===== ФІЛЬТРИ ===== */}
      <div className="flex flex-wrap justify-around items-center gap-3 mb-4">
        {/* Date */}
        <select
          value={filters.date}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        >
          <option value="">Date</option>
          {uniqueDates.map((d) => (
            <option key={`date-${d.id}`} value={d.date}>
              {new Date(d.date).toLocaleDateString("en-EN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={filters.category}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Category</option>
          {uniqueCategories.map((c) => (
            <option key={`cat-${c.id}`} value={c.category}>
              {c.category}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={filters.location}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          {uniqueLocations.map((l) => (
            <option key={`loc-${l.id}`} value={l.location}>
              {l.location}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <select
          value={filters.minPrice}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        >
          <option value="">Min price</option>
          {priceSteps.map((p) => (
            <option key={`min-${p}`} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Max Price */}
        <select
          value={filters.maxPrice}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        >
          <option value="">Max price</option>
          {priceSteps.map((p) => (
            <option key={`max-${p}`} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* ===== СПИСОК ПОДІЙ ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.length > 0 ? (
          events.map((e) => (
            <div
              key={e.id}
              className="flex flex-col bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="bg-secondary h-40 w-full rounded-t-lg" />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold italic text-dark mb-2">{e.title}</h3>
                  <p className="text-gray text-sm">
                    {new Date(e.datetime).toLocaleDateString("en-EN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {e.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Price: {e.price} €</p>
                </div>
                <div className="mt-4 self-end">
                  <Link
                    href={`/events/${e.id}`}
                    className="px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-md hover:opacity-90 transition"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No events found</p>
        )}
      </div>
    </div>
  );
}

export default EventListSort;
