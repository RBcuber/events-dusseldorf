import EventListSort from "@/src/components/eventListSort.tsx/eventListSort";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
const EventsPage = async ({}) => {
  // const events = await db.select().from(eventsDusseldorf);
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <div className=" bg-border">
        <div className="max-w-7xl mx-auto p-6">
          <section className="rounded-lg">
            <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
              Events
            </h2>
            <EventListSort />
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default EventsPage;
