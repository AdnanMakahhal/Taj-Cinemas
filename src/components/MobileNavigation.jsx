import { NavLink } from "react-router-dom";
import { House, Film, Ticket, Tag } from "lucide-react";

const destinations = [
  { to: "/Home", label: "Home", icon: House },
  { to: "/Movies", label: "Movies", icon: Film },
  { to: "/Bookings", label: "Bookings", icon: Ticket },
  { to: "/Offers", label: "Offers", icon: Tag },
];

function MobileNavigation() {
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#11161b]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:hidden">
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-1 px-3 py-2">
        {destinations.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white ${isActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.05] hover:text-white"}`}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNavigation;
