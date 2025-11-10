import EventTabs from "@/src/components/event-tabs/event-tabs";
import SimilarEvents from "@/src/components/similar-events/similar-events";
import { db } from "@/src/db";
import { events } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export default async function Event({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);

  const event = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1);

  const e = event[0];
  return (
    <div className="bg-border">
      <section className="bg-secondary/50 pb-40 pt-20 px-18 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold italic text-dark mb-3">
            {e.title}
          </h1>
          <p className="text-gray text-sm">
            {new Date(e.datetime).toLocaleDateString("en-EN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            • {e.location} • Организатор{" "}
            <span className="italic font-medium text-dark-alt">
              Event Dussldorf
            </span>
          </p>
        </div>
        <button className="bg-accent text-white px-6 py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition cursor-pointer">
          Купить билет — {e.price} $
        </button>
      </section>
      <div className=" px-15 py-10">
        <EventTabs
          description={e.description}
          program="Программа мероприятия появится позже."
          comments={[]}
        />
      </div>
      <div>
        <SimilarEvents category={e.category} id = {e.id}/>
      </div>
    </div>
  );
}
