import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldAlert, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageSEO } from "@/hooks/usePageSEO";

/* ── Padlock SVG ─────────────────────────────────────── */
const PadlockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 80" fill="none" className={className}>
    {/* Shackle */}
    <path
      d="M16 32V22C16 12.059 24.059 4 34 4h-4C20.059 4 12 12.059 12 22v10"
      stroke="#C9A227"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M48 32V22C48 12.059 39.941 4 30 4h4C43.941 4 52 12.059 52 22v10"
      stroke="#C9A227"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Body */}
    <rect x="8" y="32" width="48" height="40" rx="6" fill="#C9A227" />
    <rect x="12" y="36" width="40" height="32" rx="4" fill="#0B1F3A" />
    {/* Keyhole */}
    <circle cx="32" cy="50" r="5" fill="#C9A227" />
    <rect x="30" y="53" width="4" height="8" rx="2" fill="#C9A227" />
  </svg>
);

/* ── Pulsing shield background ───────────────────────── */
const PulsingShield = () => (
  <motion.div
    animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    aria-hidden="true"
  >
    <ShieldAlert className="w-80 h-80 text-[#C9A227]" />
  </motion.div>
);

export default function ForbiddenPage() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  usePageSEO({
    title: "403 — Hard Hat Area | IA Constructions",
    description: "You don't have permission to access this area.",
  });

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 overflow-hidden">
      <PulsingShield />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* Animated padlock */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
          className="mx-auto mb-2 w-20 sm:w-24"
        >
          <PadlockIcon className="w-full h-auto drop-shadow-lg" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="block text-[6rem] sm:text-[8rem] font-black leading-none bg-gradient-to-b from-[#C9A227] via-[#e8c94a] to-[#8a6f1a] bg-clip-text text-transparent select-none"
        >
          403
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2 flex items-center justify-center gap-2">
            <Lock className="h-6 w-6 text-[#C9A227]" />
            Hard Hat Area Only!
          </h1>
          <p className="text-[#b0c4d8] text-base sm:text-lg mb-2 max-w-md mx-auto">
            Whoa there! This zone is restricted to authorized personnel only.
          </p>
          <p className="text-[#7a9ec2] text-sm mb-8 italic">
            You'll need the right clearance to enter this construction site.
          </p>
        </motion.div>

        {/* Barrier tape divider */}
        <div className="relative h-6 mb-8 overflow-hidden rounded" aria-hidden="true">
          <motion.div
            animate={{ x: [0, -200] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex">
                <div className="w-10 h-6 bg-red-600" />
                <div className="w-10 h-6 bg-white" />
              </div>
            ))}
          </motion.div>
          <span className="absolute inset-0 flex items-center justify-center text-red-700 font-extrabold text-xs tracking-[0.3em] z-10 drop-shadow">
            ⛔ RESTRICTED ⛔ RESTRICTED ⛔
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-6 gap-2"
          >
            <Link to={isAdmin ? "/admin/login" : "/"}>
              <Home className="h-4 w-4" />
              {isAdmin ? "Sign In" : "Back to Home"}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-[#1a3a5c] text-[#e4e4e7] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
