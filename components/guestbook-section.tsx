"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getGuestbookMessages,
  createGuestbookMessage,
} from "@/data/guestbook";
import type { GuestbookMessageDTO } from "@/data/dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";

export function GuestbookSection() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState<GuestbookMessageDTO[]>([]);

  const fetchMessages = useCallback(async () => {
    const data = await getGuestbookMessages();
    setMessages(data);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    await createGuestbookMessage(name, message);

    setName("");
    setMessage("");
    setSubmitting(false);
    fetchMessages();
    router.refresh();
  };

  return (
    <section id="guestbook" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Digital Guestbook
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Leave a heartfelt message for the newlyweds to cherish forever.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <div>
              <label
                htmlFor="guest-name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Name
              </label>
              <Input
                id="guest-name"
                placeholder="e.g. Sarah Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>
            <div>
              <label
                htmlFor="guest-message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Message
              </label>
              <Textarea
                id="guest-message"
                placeholder="Write your wishes here..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-8 py-6 font-bold text-lg shadow-lg"
            >
              {submitting ? "Posting..." : "Post Message"}
            </Button>
          </form>

          {/* Messages */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-brand-purple" />
              Recent Messages
            </h3>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No messages yet. Be the first to leave one!
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm"
                  >
                    <p className="text-gray-700 italic mb-3">
                      &ldquo;{msg.message}&rdquo;
                    </p>
                    <p className="text-sm font-bold text-brand-purple">
                      &mdash; {msg.name}
                    </p>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
