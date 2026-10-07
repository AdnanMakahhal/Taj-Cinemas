# TAJ Cinemas

TAJ Cinemas is a React single-page app for browsing movies, creating an account,
choosing a cinema showtime, and viewing saved bookings. The interface is built
for desktop and mobile screens with a dark cinema-inspired theme.

## Tools and services

- **React 19** builds the interface from reusable components.
- **Vite 8** runs the local development server and creates production builds.
- **Tailwind CSS 4** provides utility-first styling.
- **React Router 7** handles navigation between pages.
- **TanStack Query 5** manages asynchronous profile and booking requests.
- **Supabase** provides email/password authentication and PostgreSQL storage
  through its JavaScript client.
- **The Movie Database (TMDB) API** supplies movie details, posters, ratings,
  and certification data.
- **Swiper** powers movie carousels.
- **Motion** provides interface animation; **Lucide React** and **Iconify** are
  used for icons.
- **ESLint** checks the JavaScript and JSX code.

## How the app works

1. **Browse movies.** The Home and Movies pages use TMDB data to show films,
   posters, ratings, runtime, and certification. Selecting **Book tickets**
   opens the showtime page with that movie's details.
2. **Choose a showtime.** The movie booking page lets the user select a city,
   cinema, date, format, and sample showtime. The selected showtime is saved
   only after the user is authenticated.
3. **Save a booking.** The app stores the movie and showtime in the
   `public.movie_bookings` Supabase table. Row Level Security policies restrict
   booking reads and inserts to the signed-in user's own records. A saved
   showtime has a booking reference and `pending` status.
4. **View bookings.** The Bookings page fetches records for the authenticated
   user and filters them into all, upcoming, or past bookings.
5. **Manage an account.** Registration and login use Supabase Auth. Profile
   fields are loaded from and saved to the Auth user's metadata. Signing out
   clears the React Query cache and returns the user to Login.
