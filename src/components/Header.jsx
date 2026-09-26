import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchWindow from "./SearchWindow";
import { AnimatePresence } from "motion/react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 z-50 flex w-full justify-center pt-4">
      <div className="flex items-center rounded-full border border-white/5 bg-[#202a30]/40 px-5 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <Logo />
        <div className="mx-4 h-4 w-px bg-[#ffffff]/15" />
        <Navigation onOpen={() => setOpen(!open)} />
        <div className="absolute left-1/2 top-[calc(100%+20px)] z-50 w-full -translate-x-1/2 px-4 flex justify-center">
          <AnimatePresence>
            {open && <SearchWindow onClose={() => setOpen(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;
