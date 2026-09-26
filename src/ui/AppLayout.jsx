import { Outlet } from "react-router-dom";
// , useLocation, useNavigate
import Header from "../components/Header";
// import { ArrowRight } from "lucide-react";

function AppLayout() {
  // const visiblePages = [];
  // "/Register", "/Login", "/Settings", "Notifications"

  // const location = useLocation();
  // const navigate = useNavigate();
  // const isBackBtnVisible = visiblePages.includes(location.pathname);
  // const navigateBtn = () => {
  //   navigate(-1);
  // };

  return (
    <div className="relative min-h-screen">
      {/* {isBackBtnVisible ? (
        <button
          className="absolute right-5 top-5 z-20 m-5 rounded-[10px] border border-white/20 bg-white/10 pr-4 pl-4 py-2.5 text-white focus:outline-none focus:border-white/40 transition flex gap-2 items-center cursor-pointer hover:bg-white/20"
          onClick={navigateBtn}
        >
          Go Back <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
      )} */}
      <Header className="sticky top-0 z-50" />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
