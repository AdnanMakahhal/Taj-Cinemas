import { motion, useReducedMotion } from "motion/react";

function HeaderPanel({ id, labelledBy, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
      className="scroll-area max-h-[calc(100dvh-168px-env(safe-area-inset-bottom))] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-[#151b22]/95 px-4 py-3 text-white shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:max-h-[calc(100dvh-96px)] sm:px-5"
    >
      {children}
    </motion.div>
  );
}

export default HeaderPanel;
