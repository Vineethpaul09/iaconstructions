import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, HardHat, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageSEO } from "@/hooks/usePageSEO";

/* ── Animated construction cone SVG ──────────────────── */
const TrafficCone = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 80" fill="none" className={className}>
    <path d="M8 76h48v4H8z" fill="#C9A227" />
    <path d="M14 76l8-32h20l8 32z" fill="#E8792B" />
    <path d="M18 60h28v6H18zM21 48h22v6H21z" fill="white" opacity="0.85" />
    <path d="M26 28h12l3 16H23z" fill="#E8792B" />
    <path d="M29 20h6l3 8H26z" fill="#E8792B" />
    <path d="M30 14h4l2 6h-8z" fill="#E8792B" />
  </svg>
);

/* ── Falling brick particles ─────────────────────────── */
const FallingBrick = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    initial={{ y: -40, x, opacity: 0, rotate: 0 }}
    animate={{ y: 300, opacity: [0, 1, 1, 0], rotate: 180 }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeIn" }}
    className="absolute top-0 w-4 h-3 rounded-sm bg-[#C9A227]/30"
  />
);

const funMessages = [
  "Looks like this plot is still vacant!",
  "This page hasn't been built yet — our crew is on another project.",
  "You've wandered off the blueprint!",
  "Even our best surveyors couldn't find this page.",
  "This road leads to an empty plot. Let's get you back on track!",
];

export default function NotFoundPage() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const message = funMessages[Math.floor(Math.random() * funMessages.length)];

  usePageSEO({
    title: "404 — End of the Road | IA Constructions",
    description:
      "Oops! This page doesn't exist. Let us help you find your way back.",
  });

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 overflow-hidden">
      {/* Floating bricks background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <FallingBrick key={i} delay={i * 0.7} x={60 + i * 80} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* Animated cone + 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto mb-2 w-24 sm:w-28"
        >
          <TrafficCone className="w-full h-auto drop-shadow-lg" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.15em" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="block text-[6rem] sm:text-[8rem] font-black leading-none bg-gradient-to-b from-[#C9A227] via-[#e8c94a] to-[#8a6f1a] bg-clip-text text-transparent select-none"
        >
          404
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2 flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-[#C9A227]" />
            End of the Road!
          </h1>
          <p className="text-[#b0c4d8] text-base sm:text-lg mb-2 max-w-md mx-auto">
            {message}
          </p>
          <p className="text-[#7a9ec2] text-sm mb-8 italic">
            Don't worry — even the best builders take a wrong turn sometimes.
          </p>
        </motion.div>

        {/* Caution tape divider */}
        <div className="relative h-6 mb-8 overflow-hidden rounded" aria-hidden="true">
          <motion.div
            animate={{ x: [0, -200] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex">
                <div className="w-12 h-6 bg-[#C9A227]" />
                <div className="w-12 h-6 bg-[#0B1F3A]" />
              </div>
            ))}
          </motion.div>
          <span className="absolute inset-0 flex items-center justify-center text-[#0B1F3A] font-extrabold text-xs tracking-[0.3em] z-10 drop-shadow">
            ⚠ CAUTION ⚠ CAUTION ⚠ CAUTION ⚠
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-6 gap-2"
          >
            <Link to={isAdmin ? "/admin" : "/"}>
              <Home className="h-4 w-4" />
              {isAdmin ? "Back to Dashboard" : "Back to Home"}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-[#1a3a5c] text-[#e4e4e7] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Retrace Your Steps
          </Button>
          {!isAdmin && (
            <Button
              asChild
              variant="outline"
              className="border-[#1a3a5c] text-[#e4e4e7] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 gap-2"
            >
              <Link to="/contact">
                <HardHat className="h-4 w-4" />
                Ask Our Crew
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
