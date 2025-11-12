import Events from "@/src/types/Events";

interface Props {
  events: Events[];
  filters: any;
  setFilters: any;
}

export default function FilterToCategory({ events, filters, setFilters }: Props) {
  const uniqueCategories = events.reduce<{ id: number; category: string }[]>((acc, e) => {
    if (!acc.some((x) => x.category === e.category)) acc.push({ id: e.id, category: e.category });
    return acc;
  }, []);

  return (
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
  );
}
