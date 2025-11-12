interface Props {
  priceSteps: number[];
  filters: any;
  setFilters: any;
}

export default function FilterToPriceMin({ priceSteps, filters, setFilters }: Props) {
  return (
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
  );
}
