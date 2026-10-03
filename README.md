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

## Getting started

### Requirements

- Node.js and npm
- A Supabase project
- A TMDB API key

### Install and configure

```sh
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_TMDB_API_KEY=your-tmdb-api-key
```

Use a **Supabase publishable key**, not a Supabase secret/service-role key.
Vite variables prefixed with `VITE_` are included in browser code, so never put
private server credentials in them. `.env` is ignored by Git.

Start the development server:

```sh
npm run dev
```

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

### Enable booking storage in Supabase

Apply [`supabase/migrations/20261004003000_create_movie_bookings.sql`](./supabase/migrations/20261004003000_create_movie_bookings.sql)
to your Supabase project before creating or viewing bookings. You can apply it
with the Supabase CLI in a linked project or run the migration in the Supabase
Dashboard SQL Editor.

> Seat selection, payment, and live cinema schedules are not implemented yet.
> Showtimes and cinema choices are sample data; saved bookings remain pending
> and do not reserve seats or confirm a ticket.

## Project commands

```sh
npm run dev      # Start the Vite development server
npm run lint     # Run ESLint
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```
