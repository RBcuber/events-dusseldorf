"use client";
import {Events} from "@/src/types/Events";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<Events[]>([]);

async function fetchCategories() {
        const res = await fetch("/api/events");
        const data = await res.json();
        setCategories(data);
    }

    const uniqueCategories = categories.reduce<Events[]>((acc, item) => {
    const category = item.category;
    if (!acc.some((g) => g.category === category)) acc.push(item);
    return acc;
  }, []);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  return (
    <section className="bg-border py-12">
      <div className="max-w-6xl ml-20 px-6">
        <h2 className="text-2xl font-semibold text-dark mb-6">Категории</h2>
        <div className="flex flex-wrap gap-6">
          {uniqueCategories.map((c) => (
            <Link
              key={c.id}
              href={`/events?category=${encodeURIComponent(c.category)}`}
              className="px-4 py-2 bg-white border border-border rounded-full shadow hover:bg-accent hover:text-white transition"
            >
              {c.category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
