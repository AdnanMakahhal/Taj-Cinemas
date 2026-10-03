create table if not exists public.movie_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique
    default 'TAJ-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id text,
  movie_title text not null,
  poster_url text,
  city text not null,
  cinema text not null,
  show_date date not null,
  show_time time not null,
  screen text not null,
  format text not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists movie_bookings_user_date_idx
  on public.movie_bookings (user_id, show_date, show_time);

alter table public.movie_bookings enable row level security;

create policy "Users can view their own movie bookings"
  on public.movie_bookings
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own movie bookings"
  on public.movie_bookings
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
