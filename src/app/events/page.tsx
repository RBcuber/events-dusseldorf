import { db } from "@/src/db";
import { events as eventsDusseldorf } from "@/src/db/schema"

const EventsPage = async ({}) => {
  const events = await db.select().from(eventsDusseldorf);
  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-600">
      <section className="bg-white/80 dark:bg-gray-900/60 backdrop-blur rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Events</h2>

        {events.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">No upcoming events.</p>
        ) : (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
