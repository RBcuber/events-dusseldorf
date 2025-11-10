"use client";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  datetime: string;
  title: string;
  category: string;
  price: number;
  location: string;
}

function EventListSort() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Завантаження всіх подій
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
    }
    fetchEvents();
  }, []);

  // Фільтрація з API при кожній зміні select
  useEffect(() => {
    async function fetchFiltered() {
      const params = new URLSearchParams();

      if (selectedDate) params.append("date", selectedDate);
      if (selectedTitle) params.append("title", selectedTitle);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedPrice) params.append("price", selectedPrice);
      if (selectedLocation) params.append("location", selectedLocation);

      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setFilteredEvents(data);
    }

    fetchFiltered();
  }, [selectedDate, selectedTitle, selectedCategory, selectedPrice, selectedLocation]);

  // Унікальні значення для списків
  const dates = [...new Set(events.map(e => e.datetime))];
  const titles = [...new Set(events.map(e => e.title))];
  const categories = [...new Set(events.map(e => e.category))];
  const prices = [...new Set(events.map(e => e.price.toString()))];
  const locations = [...new Set(events.map(e => e.location))];

  return (
    <div className="bg-white p-4 m-4 rounded-2xl">
      {/* Фільтри */}
      <div className="flex flex-wrap justify-around items-center gap-3 mb-4">
        <select
          value={selectedDate}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Date</option>
          {dates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={selectedTitle}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          <option value="">Title</option>
          {titles.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedPrice}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Price</option>
          {prices.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={selectedLocation}
          className="bg-border text-gray-600 px-4 py-2 rounded-xl"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Location</option>
          {locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Виведення подій */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="border rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.datetime}</p>
              <p>{event.category}</p>
              <p>{event.location}</p>
              <p className="text-green-700 font-medium">{event.price} €</p>
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
