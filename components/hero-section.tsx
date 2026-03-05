import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="hero-gradient flex items-center justify-center text-white pt-20 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Share Your Love <br /> Through Photos
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light">
          Help us capture every precious moment of our special day. Your
          perspective completes our story.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-purple hover:bg-gray-100 rounded-xl px-8 py-6 font-bold text-lg shadow-xl"
          >
            <a href="#upload">Upload Your Memories</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white/50 text-white hover:bg-white/10 rounded-xl px-8 py-6 font-bold text-lg bg-transparent"
          >
            <a href="#gallery">View Guest Gallery</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
