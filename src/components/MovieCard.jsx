// import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { timeStamp } from "../services/timestamp";

function MovieCard({ movie, sectionTitle, type }) {
  return (
    <div className="relative inset-0 z-50 w-full h-full bg-[#FFFFFF]/3.5 stroke-[#FFFFFF]/10 border border-white/15 rounded-2xl overflow-hidden">
      <img
        src={movie.poster_path}
        alt={movie.title}
        width="500"
        height="750"
        loading="lazy"
        decoding="async"
        className="aspect-2/3 w-full object-cover"
      />
      <div className="absolute left-3 top-3 w-35 h-10 rounded-2xl flex items-center justify-center bg-[#050505]/72 stroke-[#FFFFFF]/13 border border-white/50 rounded-2xl">
        <p className="text-white font-medium text-sm">{sectionTitle}</p>
      </div>

      <div className="p-3.5 h-40">
        <p className="text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {movie.title}
        </p>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="flex min-h-8 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[#FFFFFF]/5 bg-[#202a30]/40 px-3 py-1.5 text-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs">
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-[#F0B100]"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>{" "}
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
          <div className="flex min-h-8 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[#FFFFFF]/5 bg-[#202a30]/40 px-3 py-1.5 text-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs">
            {timeStamp(movie.runtime)}
          </div>
          <div className="flex min-h-8 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[#FFFFFF]/5 bg-[#202a30]/40 px-3 py-1.5 text-sm shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs">
            {movie.certification}
          </div>
        </div>
        {type === "movies" && (
          <Link
            to="/MoviesObsession"
            state={{ movie }}
            className="bg-[#FFFFFF] w-full cursor-pointer h-12 flex items-center justify-center font-bold text-lg rounded-md text-[#0A0A0A] hover:bg-white/85 transition-colors"
          >
            Book tickets
          </Link>
        )}
        {type === "moviesThisWeek" && (
          <Link
            to="/MoviesObsession"
            state={{ movie, bookingMode: "future" }}
            className="bg-white/[0.055] w-full h-12 flex items-center justify-center border border-white/[0.13] font-bold text-lg rounded-md text-[#D9D9D9] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Choose a day
          </Link>
        )}
        {type === "moviesComingSoon" && (
          <button type="button" disabled className="bg-[#E5E5E5]/5.5 cursor-not-allowed w-full h-12 flex items-center justify-center border border-white/[0.13] font-bold text-lg rounded-md text-[#D9D9D9]">
            Bookings open soon
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
