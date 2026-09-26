import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-8xl font-black text-white/20 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-3">Page Not Found</h2>
      <p className="text-[#FFFFFF]/70 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/Home"
        className="px-6 py-3 rounded-xl bg-[#FFFFFF] text-[#0d1117] font-semibold hover:bg-[#FFFFFF]/90 transition cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
