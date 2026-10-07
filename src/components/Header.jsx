import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchWindow from "./SearchWindow";
import NotificationsWindow from "./NotificationsWindow";
import { AnimatePresence } from "motion/react";

function HeaderContent() {
  const [openPanel, setOpenPanel] = useState(null);
  const headerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!openPanel) return;
    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setOpenPanel(null);
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenPanel(null);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPanel]);

  function togglePanel(name, event) {
    triggerRef.current = event.currentTarget;
    setOpenPanel((current) => current === name ? null : name);
  }

  function closePanel() {
    setOpenPanel(null);
    triggerRef.current?.focus();
  }

  return (
    <header ref={headerRef} className="absolute top-0 left-0 z-50 flex w-full justify-center pt-4">
      <div className="flex items-center rounded-full border border-white/5 bg-[#202a30]/40 px-4 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <Logo />
        <div className="mx-3 h-4 w-px bg-[#ffffff]/15" />
        <Navigation
          activePanel={openPanel}
          onOpenSearch={(event) => togglePanel("search", event)}
          onOpenNotifications={(event) => togglePanel("notifications", event)}
        />
      </div>
      <div className="absolute left-1/2 top-[calc(100%+12px)] z-50 flex w-full -translate-x-1/2 justify-center px-4">
        <AnimatePresence mode="wait">
          {openPanel === "search" && <SearchWindow key="search" onClose={closePanel} />}
          {openPanel === "notifications" && <NotificationsWindow key="notifications" onClose={closePanel} />}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Header() {
  const { pathname } = useLocation();
  return <HeaderContent key={pathname} />;
}

export default Header;
