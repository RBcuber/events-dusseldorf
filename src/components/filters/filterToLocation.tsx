import Events from "@/src/types/Events";

interface Props {
  events: Events[];
  filters: any;
  setFilters: any;
}

export default function FilterToLocation({ events, filters, setFilters }: Props) {
  const uniqueLocations = events.reduce<{ id: number; location: string }[]>((acc, e) => {
    if (!acc.some((x) => x.location === e.location)) acc.push({ id: e.id, location: e.location });
    return acc;
  }, []);

  return (
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
  );
}
