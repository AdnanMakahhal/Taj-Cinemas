import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavigation from "../components/MobileNavigation";

const footerPages = new Set([
  "/bookings",
  "/movies",
  "/offers",
  "/settings",
  "/login",
  "/register",
]);

function AppLayout() {
  const { pathname } = useLocation();
  const pagePath = pathname.replace(/\/+$/, "").toLowerCase();
  const showFooter = footerPages.has(pagePath);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className={`relative flex min-h-dvh flex-col ${pagePath === "/home" ? "" : "pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-0"}`}>
      <Header />
      <main
        className={showFooter
          ? "flex w-full flex-1 flex-col [&>*]:min-h-0 [&>*]:w-full [&>*]:flex-1"
          : "w-full h-full"}
      >
        <Outlet />
      </main>
      {showFooter && <Footer />}
      <MobileNavigation />
    </div>
  );
}

export default AppLayout;
