"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { PhotoDTO } from "./dto";

export async function getPhotos(): Promise<PhotoDTO[]> {
  const supabase = createServerClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  return (photos ?? []).map((photo) => ({
    id: photo.id,
    filePath: photo.file_path,
    uploaderName: photo.uploader_name ?? null,
    url: supabase.storage
      .from("wedding-photos")
      .getPublicUrl(photo.file_path).data.publicUrl,
    createdAt: photo.created_at,
  }));
}

export async function insertPhoto(filePath: string): Promise<void> {
  const supabase = createServerClient();
  await supabase.from("photos").insert({ file_path: filePath });
}
