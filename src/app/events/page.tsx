import EventListSort from "@/src/components/eventListSort.tsx/eventListSort";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
const EventsPage = async ({}) => {
  // const events = await db.select().from(eventsDusseldorf);
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <div className="max-w-7xl mx-auto p-6 bg-border">
        <section className="bg-border dark:bg-gray-900/60 backdrop-blur rounded-lg shadow-md p-6">
          <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-4">
            Events
          </h2>

          <EventListSort />
        </section>
      </div>
    </Suspense>
  );
};

export default EventsPage;
