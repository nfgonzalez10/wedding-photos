import { AppShell } from "@/components/app-shell";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";
import { PhotoGrid } from "@/components/photo-grid";
import { getAllPhotos } from "@/data/photos";

export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const { photos, hasMore } = await getAllPhotos(0);

  return (
    <AppShell>
      <Navigation />
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Photos
            </h1>
            <p className="text-gray-500">
              Every moment captured by our loved ones.
            </p>
          </div>
          <PhotoGrid initialPhotos={photos} initialHasMore={hasMore} />
        </div>
      </section>
      <SiteFooter />
    </AppShell>
  );
}
