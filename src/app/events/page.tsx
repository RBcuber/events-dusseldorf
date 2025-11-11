
import EventListSort from "@/src/components/eventListSort.tsx/eventListSort";
import EventsList from "@/src/components/eventsList";

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-600">
      <section className="bg-white/80 dark:bg-gray-900/60 backdrop-blur rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-4">
          Events
        </h2>

        <EventListSort />
        <EventsList />
      </section>
    </div>
  );
}

