import Image from "next/image";
import { getPhotos } from "@/data/photos";
import { ImageIcon } from "lucide-react";

export async function GallerySection() {
  const photosWithUrls = await getPhotos();

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              The Guest Gallery
            </h2>
            <p className="text-gray-500">
              Moments captured by our loved ones.
            </p>
          </div>
          {photosWithUrls.length > 0 && (
            <span className="text-brand-purple font-semibold text-sm">
              {photosWithUrls.length} photo{photosWithUrls.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {photosWithUrls.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ImageIcon className="h-16 w-16 mx-auto mb-4" strokeWidth={1} />
            <p className="text-lg font-medium">No photos yet</p>
            <p className="text-sm mt-1">
              Be the first to{" "}
              <a href="#upload" className="text-brand-purple underline">
                upload a memory
              </a>
              !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photosWithUrls.map((photo) => (
              <div
                key={photo.id}
                className="gallery-item aspect-square bg-white shadow-sm rounded-xl overflow-hidden"
              >
                <Image
                  src={photo.url}
                  alt="Wedding guest photo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
