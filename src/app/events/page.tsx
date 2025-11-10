import EventListSort from "@/src/components/eventListSort.tsx/eventListSort";
import { db } from "@/src/db";
import { events as eventsDusseldorf } from "@/src/db/schema";
import Link from "next/link";

const EventsPage = async ({}) => {
  const events = await db.select().from(eventsDusseldorf);
  return (
    <div className="max-w-7xl mx-auto p-6 bg-border">
      <section className="bg-border dark:bg-gray-900/60 backdrop-blur rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-4">
          Events
        </h2>

        <EventListSort />

        {events.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No upcoming events.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex flex-col bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="bg-secondary h-40 w-full rounded-t-lg" />

                <div className="p-4 flex flex-col justify-between">
                  <div className="pb-15">
                    <h3 className="font-semibold italic text-dark mb-2">
                      {e.title}
                    </h3>

                    <p className="text-gray text-sm">
                      {new Date(e.datetime).toLocaleDateString("en-EN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      • {e.location}
                    </p>
                  </div>
                  <div className="mt-4 self-end">
                    <Link
                      href={`/events/${e.id}`}
                      className="px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-md hover:opacity-90 transition"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
