import { NavLink } from "react-router-dom";
import { Search, Bell, Settings, UserX, User } from "lucide-react";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";

function Navigation({ onOpen }) {
  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? "text-white font-medium" : "text-[#FFFFFF]/75 hover:text-[#FFFFFF]"}`;

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
      <ul className="flex gap-7">
        <div className="flex items-center gap-7 text-sm max-sm:hidden">
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
        <div className="flex items-center gap-7 text-sm">
          <li className="flex shrink-0">
            <button
              onClick={onOpen}
              className="text-[#FFFFFF]/75 hover:text-[#FFFFFF] cursor-pointer"
            >
              <Search className="size-5" />
            </button>
          </li>
          <li className="flex shrink-0">
            <NavLink to="/Notifications" className={linkClass}>
              <Bell className="size-5" />
            </NavLink>
          </li>
          <li className="flex shrink-0">
            <NavLink to="/Settings" className={linkClass}>
              <Settings className="size-5" />
            </NavLink>
          </li>
          <li className="flex shrink-0">
            {session?.user ? (
              <NavLink to="/Profile" className={linkClass}>
                <User className="size-5" />
              </NavLink>
            ) : (
              <NavLink to="/Register" className={linkClass}>
                <UserX className="size-5" />
              </NavLink>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
