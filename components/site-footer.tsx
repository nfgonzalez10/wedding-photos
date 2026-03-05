export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-2xl font-bold mb-4 italic">Munay Memories</p>
        <p className="text-gray-400 mb-8">
          Thank you for being part of our day and for helping us remember it
          forever.
        </p>
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Munay Memories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
