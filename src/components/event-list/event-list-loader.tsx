interface Props {
  hasMore: boolean;
  loading: boolean;
   loaderRef: React.RefObject<HTMLDivElement | null>;
  total: number;
}

export default function EventListLoader({ hasMore, loading, loaderRef, total }: Props) {
  if (hasMore)
    return (
      <div ref={loaderRef} className="text-center py-6 text-gray-500">
        {loading ? "Loading more events..." : "Scroll down to load more"}
      </div>
    );

  if (total > 0)
    return (
      <div className="text-center py-6 text-gray-400 italic">
        No more events to show
      </div>
    );

  return null;
}
