import EventListSort from "@/src/components/eventListSort.tsx/eventListSort";
import { db } from "@/src/db";
import { events as eventsDusseldorf } from "@/src/db/schema";

const EventsPage = async ({}) => {
  // const events = await db.select().from(eventsDusseldorf);
  return (
    <div className="max-w-7xl mx-auto p-6 bg-border">
      <section className="bg-border dark:bg-gray-900/60 backdrop-blur rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-4">
          Events
        </h2>

        <EventListSort />
      </section>
    </div>
  );
};

export default EventsPage;
