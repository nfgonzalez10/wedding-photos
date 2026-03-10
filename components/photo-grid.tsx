"use client";

import { getAllPhotos } from "@/data/photos";
import type { PhotoDTO } from "@/data/dto";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";

export function PhotoGrid({
  initialPhotos,
  initialHasMore,
}: {
  initialPhotos: PhotoDTO[];
  initialHasMore: boolean;
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    const result = await getAllPhotos(nextPage);

    setPhotos((prev) => [...prev, ...result.photos]);
    setPage(nextPage);
    setHasMore(result.hasMore);
    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <ImageIcon className="h-16 w-16 mx-auto mb-4" strokeWidth={1} />
        <p className="text-lg font-medium">No photos yet</p>
        <p className="text-sm mt-1">
          Be the first to{" "}
          <a href="/#upload" className="text-brand-purple underline">
            upload a memory
          </a>
          !
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square bg-white shadow-sm rounded-xl overflow-hidden"
          >
            <Image
              src={photo.url}
              alt="Wedding guest photo"
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full object-cover"
              unoptimized={photo.url.includes("127.0.0.1")}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-12">
          {loading ? (
            <Loader2Icon className="h-8 w-8 animate-spin text-brand-purple" />
          ) : (
            <Button variant="outline" onClick={loadMore}>
              Load more photos
            </Button>
          )}
        </div>
      )}
    </>
  );
}
