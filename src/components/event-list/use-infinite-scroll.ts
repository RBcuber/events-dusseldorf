import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(items: T[], step = 10) {
  const [visibleCount, setVisibleCount] = useState(step);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(items.length > step);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(step);
    setHasMore(items.length > step);
  }, [items, step]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => {
              const next = prev + step;
              if (next >= items.length) setHasMore(false);
              return next;
            });
            setLoading(false);
          }, 400);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [items, hasMore, loading, step]);

  return { visibleCount, loaderRef, hasMore, loading };
}
