"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { PhotoDTO } from "./dto";

const PAGE_SIZE = 24;

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

export async function getAllPhotos(
  page: number = 0,
): Promise<{ photos: PhotoDTO[]; hasMore: boolean }> {
  const supabase = createServerClient();

  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to + 1);

  const rows = photos ?? [];
  const hasMore = rows.length > PAGE_SIZE;
  const pageRows = hasMore ? rows.slice(0, PAGE_SIZE) : rows;

  return {
    photos: pageRows.map((photo) => ({
      id: photo.id,
      filePath: photo.file_path,
      uploaderName: photo.uploader_name ?? null,
      url: supabase.storage
        .from("wedding-photos")
        .getPublicUrl(photo.file_path).data.publicUrl,
      createdAt: photo.created_at,
    })),
    hasMore,
  };
}

export async function insertPhoto(filePath: string): Promise<void> {
  const supabase = createServerClient();
  await supabase.from("photos").insert({ file_path: filePath });
}
