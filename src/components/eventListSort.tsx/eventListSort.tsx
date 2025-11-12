"use client";
import { useFilters } from "@/src/hooks/useFilters";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterToCategory from "../filters/filtersToCategory";
import FilterToDate from "../filters/filtersToDate";
import FilterToLocation from "../filters/filterToLocation";
import FilterToPriceMax from "../filters/filterToPriceMax";
import FilterToPriceMin from "../filters/filterToPriceMin";
import { useRouter, useSearchParams } from "next/navigation";
import Events from "@/src/types/Events";

function EventListSort() {
  const { filters, setFilters } = useFilters();
  const [events, setEvents] = useState<Events[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function fetchEvents(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/events?${query}`);
    const data = await res.json();
    setEvents(data);
  }
  // Завантаження подій з API
  useEffect(() => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ) as Record<string, string>;
    const query = new URLSearchParams(activeFilters).toString();
    const correctSearch = searchParams.toString();
    if (query === correctSearch) return;
    console.log(filters);
    router.replace(`/events?${query}`, { scroll: false });
    fetchEvents(activeFilters);
  }, [filters]);

  useEffect(() => {
    const urlFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      urlFilters[key] = value;
    });

    if (Object.keys(urlFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
    }
  }, [searchParams, setFilters]);

  // Підвантаження при зміні фільтрів
  useEffect(() => {
    async function fetchFiltered() {
      const params = new URLSearchParams(
        filters as Record<string, string>
      ).toString();
      const res = await fetch(`/api/events?${params}`);
      const data = await res.json();
      setEvents(data);
    }
    fetchFiltered();
  }, [filters]);

  useEffect(() => {
    return () => {
      setFilters({
        date: "",
        title: "",
        category: "",
        location: "",
        price: "",
        minPrice: "",
        maxPrice: "",
      });
    };
  }, [setFilters]);

  // Генерація кроків ціни
  const maxPriceValue = Math.max(...events.map((e) => e.price || 0), 100);
  const priceSteps = Array.from(
    { length: Math.ceil(maxPriceValue / 5) + 1 },
    (_, i) => i * 5
  );

  return (
    <div className="bg-white p-4 m-4 rounded-2xl">
      <div className="flex flex-wrap justify-around items-center gap-3 mb-4">
        <FilterToDate
          events={events}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterToCategory
          events={events}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterToLocation
          events={events}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterToPriceMin
          priceSteps={priceSteps}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterToPriceMax
          priceSteps={priceSteps}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* ===== Список подій ===== */}
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
                  <h3 className="font-semibold italic text-dark mb-2">
                    {e.title}
                  </h3>
                  <p className="text-gray text-sm">
                    {new Date(e.datetime).toLocaleDateString("en-EN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {e.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Price: {e.price} €
                  </p>
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
