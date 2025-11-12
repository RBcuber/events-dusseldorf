"use client";
import { useState, useEffect, useRef } from "react";
import { useFilters } from "@/src/hooks/useFilters";
import { useInfiniteScroll } from "./use-infinite-scroll";
import FilterToCategory from "../filters/filtersToCategory";
import FilterToDate from "../filters/filtersToDate";
import FilterToLocation from "../filters/filterToLocation";
import FilterToPriceMin from "../filters/filterToPriceMin";
import FilterToPriceMax from "../filters/filterToPriceMax";
import Events from "@/src/types/Events";
import {useRouter, useSearchParams } from "next/navigation";
import EventList from "./event-list";
import EventListLoader from "./event-list-loader";

export default function EventListContainer() {

  const { filters, setFilters } = useFilters();
  const [events, setEvents] = useState<Events[]>([]);
  const [allEvents, setAllEvents] = useState<Events[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { visibleCount, loaderRef, hasMore, loading } = useInfiniteScroll(events);
  const syncedRef = useRef(false);

  useEffect(() => {
    async function loadAll() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setAllEvents(data);
      setEvents(data);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const urlFilters = Object.fromEntries(searchParams.entries());
    if (Object.keys(urlFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
    }
    syncedRef.current = true; 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!syncedRef.current) return;
    async function fetchFiltered() {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      ) as Record<string, string>;
      const query = new URLSearchParams(activeFilters).toString();
      const currentQuery = searchParams.toString();
      if (query !== currentQuery) {
        router.replace(`/events?${query}`, { scroll: false });
      }

      const res = await fetch(`/api/events?${query}`);
      const data = await res.json();
      setEvents(data);
    }

    fetchFiltered();
  }, [filters, router, searchParams]);

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

  const maxPriceValue = Math.max(...events.map((e) => e.price || 0), 100);
  const priceSteps = Array.from(
    { length: Math.ceil(maxPriceValue / 5) + 1 },
    (_, i) => i * 5
  );

  return (
    <div className="bg-border py-10"> 
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">
          <div className="flex flex-wrap justify-around items-center gap-3">
            <FilterToDate events={allEvents} filters={filters} setFilters={setFilters} />
            <FilterToCategory events={allEvents} filters={filters} setFilters={setFilters} />
            <FilterToLocation events={allEvents} filters={filters} setFilters={setFilters} />
            <FilterToPriceMin priceSteps={priceSteps} filters={filters} setFilters={setFilters} />
            <FilterToPriceMax priceSteps={priceSteps} filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <EventList events={events} visibleCount={visibleCount} />

        <EventListLoader
          hasMore={hasMore}
          loading={loading}
          loaderRef={loaderRef}
          total={events.length}
        />
      </div>
    </div>
  );
}
