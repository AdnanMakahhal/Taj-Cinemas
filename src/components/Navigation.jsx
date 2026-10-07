import { NavLink } from "react-router-dom";
import { Search, Bell, Settings, UserX, User } from "lucide-react";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";

function Navigation({ onOpenSearch, onOpenNotifications, activePanel }) {
  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? "text-white font-medium" : "text-[#FFFFFF]/75 hover:text-[#FFFFFF]"}`;
  const iconLinkClass = ({ isActive }) =>
    `flex size-9 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white ${linkClass({ isActive })}`;

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="relative">
      <ul className="flex items-center gap-4 sm:gap-5">
        <div className="flex items-center gap-5 text-sm max-sm:hidden">
          <li className="cursor-pointer">
            <NavLink to="/Home" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/Movies" className={linkClass}>
              Movies
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/Bookings" className={linkClass}>
              Bookings
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/Offers" className={linkClass}>
              Offers
            </NavLink>
          </li>
        </div>
        <div className="flex items-center gap-1 text-sm sm:gap-2">
          <li className="flex shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search movies"
              aria-expanded={activePanel === "search"}
              aria-controls="search-panel"
              aria-haspopup="dialog"
              className={`flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white ${activePanel === "search" ? "bg-white/10 text-white" : "text-white/75"}`}
            >
              <Search aria-hidden="true" className="size-5" />
            </button>
          </li>
          <li className="flex shrink-0">
            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Open notifications"
              aria-expanded={activePanel === "notifications"}
              aria-controls="notifications-panel"
              aria-haspopup="dialog"
              className={`flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white ${activePanel === "notifications" ? "bg-white/10 text-white" : "text-white/75"}`}
            >
              <Bell aria-hidden="true" className="size-5" />
            </button>
          </li>
          <li className="flex shrink-0">
            <NavLink to="/Settings" aria-label="Settings" className={iconLinkClass}>
              <Settings aria-hidden="true" className="size-5" />
            </NavLink>
          </li>
          <li className="flex shrink-0">
            {session?.user ? (
              <NavLink to="/Profile" aria-label="Your profile" className={iconLinkClass}>
                <User aria-hidden="true" className="size-5" />
              </NavLink>
            ) : (
              <NavLink to="/Register" aria-label="Create an account" className={iconLinkClass}>
                <UserX aria-hidden="true" className="size-5" />
              </NavLink>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
