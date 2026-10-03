import supabase from "./supabase";

async function getAuthenticatedUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) throw new Error("Sign in before creating or viewing bookings.");

  return user;
}

export async function createMovieBooking(booking) {
  const user = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("movie_bookings")
    .insert({
      user_id: user.id,
      movie_id: booking.movieId ? String(booking.movieId) : null,
      movie_title: booking.movieTitle,
      poster_url: booking.posterUrl || null,
      city: booking.city,
      cinema: booking.cinema,
      show_date: booking.showDate,
      show_time: booking.showTime,
      screen: booking.screen,
      format: booking.format,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getMovieBookings() {
  await getAuthenticatedUser();

  const { data, error } = await supabase
    .from("movie_bookings")
    .select(
      "id, booking_reference, movie_id, movie_title, poster_url, city, cinema, show_date, show_time, screen, format, status, created_at",
    )
    .order("show_date", { ascending: true })
    .order("show_time", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}
