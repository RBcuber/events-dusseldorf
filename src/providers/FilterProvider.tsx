"use client";

import { ReactNode, useState } from "react";
import FilterValues from "../types/FilterValues";
import { FilterContext } from "../context/FilterContext";

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterValues>({
    date: "",
    title: "",
    category: "",
    location: "",
    price: "",
    minPrice: "",
    maxPrice: "",
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
