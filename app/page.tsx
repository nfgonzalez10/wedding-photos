import { AppShell } from "@/components/app-shell";
import { GallerySection } from "@/components/gallery-section";
import { GuestbookSection } from "@/components/guestbook-section";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";
import { TakePictureSection } from "@/components/take-picture";
import { UploadSection } from "@/components/upload-section";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <AppShell>
      <Navigation />
      <HeroSection />
      <div className="flex flex-row items-center justify-center my-12 w-full">
        <UploadSection />

        <TakePictureSection />
      </div>
      <GallerySection />
      <GuestbookSection />
      <SiteFooter />
    </AppShell>
  );
}
