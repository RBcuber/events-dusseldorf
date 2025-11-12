import Link from "next/link";
import Events from "@/src/types/Events";

interface Props {
  events: Events[];
  visibleCount: number;
}

export default function EventList({ events, visibleCount }: Props) {
  if (!events.length)
    return <p className="text-center text-gray-400">No events found</p>;

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
      {events.slice(0, visibleCount).map((e) => (
        <div
          key={e.id}
          className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
        >
          {
          <div className="bg-secondary h-44 w-full rounded-t-2xl" />
}
          <div className="flex flex-col justify-between p-5 grow">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {e.title || "Event title"}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(e.datetime).toLocaleDateString("en-EN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                • {e.location || "Dusseldorf"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium text-gray-700">Price:</span>{" "}
                {e.price ? `${e.price} €` : "Free"}
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                href={`/events/${e.id}`}
                className="px-4 py-2 bg-accent/70 text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
