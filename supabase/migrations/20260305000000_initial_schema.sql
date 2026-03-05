create table public.photos (
  id uuid primary key default gen_random_uuid(),
  file_path text not null,
  uploader_name text,
  created_at timestamptz not null default now()
);

alter table public.photos enable row level security;
create policy "photos_select" on public.photos for select using (true);
create policy "photos_insert" on public.photos for insert with check (true);

create table public.guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.guestbook_messages enable row level security;
create policy "guestbook_select" on public.guestbook_messages for select using (true);
create policy "guestbook_insert" on public.guestbook_messages for insert with check (true);

-- Storage: allow public uploads and reads on the wedding-photos bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('wedding-photos', 'wedding-photos', true, 20971520, array['image/png','image/jpeg','image/heic','image/webp']);

create policy "wedding_photos_upload" on storage.objects for insert with check (bucket_id = 'wedding-photos');
create policy "wedding_photos_read" on storage.objects for select using (bucket_id = 'wedding-photos');
