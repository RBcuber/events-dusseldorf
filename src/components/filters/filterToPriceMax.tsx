interface Props {
  priceSteps: number[];
  filters: any;
  setFilters: any;
}

export default function FilterToPriceMax({ priceSteps, filters, setFilters }: Props) {
  return (
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
  );
}
