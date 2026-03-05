"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { GuestbookMessageDTO } from "./dto";

export async function getGuestbookMessages(): Promise<GuestbookMessageDTO[]> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("guestbook_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (data ?? []).map((msg) => ({
    id: msg.id,
    name: msg.name,
    message: msg.message,
    createdAt: msg.created_at,
  }));
}

export async function createGuestbookMessage(
  name: string,
  message: string,
): Promise<void> {
  const supabase = createServerClient();
  await supabase
    .from("guestbook_messages")
    .insert({ name: name.trim(), message: message.trim() });
}
