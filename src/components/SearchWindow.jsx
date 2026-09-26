import { X } from "lucide-react";
import { motion } from "motion/react";

function SearchWindow({ onClose }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-xl rounded-2xl border backdrop-blur-md border-white/50 bg-[#202a30]/65 px-5 py-4 shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <input
          type="search"
          placeholder="Search movies..."
          className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={onClose}
          type="button"
          className="text-white/60 transition hover:text-white cursor-pointer"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <img
          src=""
          alt=""
          className="h-14 w-10 rounded-md object-cover bg-white/10"
        />

        <div>
          <p className="font-medium text-white">Movie Name</p>

          <p className="text-sm text-white/50">2026 • Action</p>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchWindow;
