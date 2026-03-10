"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-tight text-brand-purple">
            Munay <span className="text-brand-deep-violet">Memories</span>
          </span>
        </Link>

        <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600 uppercase tracking-widest">
          <li>
            <Link
              href="/photos"
              className="hover:text-brand-purple transition-colors"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/#upload"
              className="hover:text-brand-purple transition-colors"
            >
              Upload
            </Link>
          </li>
          <li>
            <Link
              href="/#guestbook"
              className="hover:text-brand-purple transition-colors"
            >
              Guestbook
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-effect border-t border-gray-100 px-6 pb-4">
          <ul className="flex flex-col space-y-4 text-sm font-semibold text-gray-600 uppercase tracking-widest">
            <li>
              <a
                href="#gallery"
                onClick={() => setOpen(false)}
                className="hover:text-brand-purple transition-colors"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#upload"
                onClick={() => setOpen(false)}
                className="hover:text-brand-purple transition-colors"
              >
                Upload
              </a>
            </li>
            <li>
              <a
                href="#guestbook"
                onClick={() => setOpen(false)}
                className="hover:text-brand-purple transition-colors"
              >
                Guestbook
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
