"use client";

import { createContext } from "react";
import FilterValues from "../types/FilterValues";

interface FilterContextType {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
}
export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);
