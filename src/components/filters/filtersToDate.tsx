import Events from "@/src/types/Events";

interface Props {
  events: Events[];
  filters: any;
  setFilters: any;
}

export default function FilterToDate({ events, filters, setFilters }: Props) {
  const uniqueDates = events
    .reduce<{ id: number; date: string }[]>((acc, e) => {
      const date = new Date(e.datetime).toISOString().split("T")[0];
      if (!acc.some((x) => x.date === date)) acc.push({ id: e.id, date });
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <select
      value={filters.date}
      className="bg-border text-gray-600 px-4 py-2 rounded-xl"
      onChange={(e) => setFilters({ ...filters, date: e.target.value })}
    >
      <option value="">Date</option>
      {uniqueDates.map((d) => (
        <option key={`date-${d.id}`} value={d.date}>
          {new Date(d.date).toLocaleDateString("en-EN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </option>
      ))}
    </select>
  );
}
