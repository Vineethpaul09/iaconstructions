import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, RefreshCw, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

/* ── Wrecking-ball SVG ───────────────────────────────── */
const WreckingBall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 120" fill="none" className={className}>
    {/* Chain */}
    <line x1="40" y1="0" x2="40" y2="60" stroke="#C9A227" strokeWidth="3" strokeDasharray="6 4" />
    {/* Ball */}
    <circle cx="40" cy="80" r="20" fill="#555" />
    <circle cx="40" cy="80" r="17" fill="#777" />
    <ellipse cx="35" cy="74" rx="5" ry="4" fill="#999" opacity="0.5" />
  </svg>
);

/* ── Dust particle ───────────────────────────────────── */
const DustCloud = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, x, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0],
      y: [-20, -60 - Math.random() * 40],
      x: [x, x + (Math.random() - 0.5) * 80],
      scale: [0, 1.5, 0.5],
    }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeOut" }}
    className="absolute bottom-24 rounded-full bg-[#C9A227]/20"
    style={{ width: size, height: size }}
    aria-hidden="true"
  />
);

/* ── Crack lines SVG ─────────────────────────────────── */
const CrackLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
    viewBox="0 0 400 400"
    aria-hidden="true"
  >
    <path d="M200 0 L195 80 L210 120 L190 180 L205 250 L185 320 L200 400" stroke="#C9A227" strokeWidth="2" fill="none" />
    <path d="M210 120 L260 140 L290 130" stroke="#C9A227" strokeWidth="1.5" fill="none" />
    <path d="M190 180 L140 200 L110 195" stroke="#C9A227" strokeWidth="1.5" fill="none" />
    <path d="M205 250 L250 270 L280 260" stroke="#C9A227" strokeWidth="1.5" fill="none" />
  </svg>
);

const funMessages: Record<number, { heading: string; sub: string; tagline: string }> = {
  500: {
    heading: "The Crane Came Crashing Down!",
    sub: "Something went sideways on our construction site. Our engineers have been dispatched with hard hats and hot coffee.",
    tagline: "Rebuilding in progress... hang tight!",
  },
  502: {
    heading: "Bad Gateway — Bridge Out!",
    sub: "The bridge between you and our servers collapsed. We're laying new foundations.",
    tagline: "Please detour and try again shortly.",
  },
  503: {
    heading: "Under Emergency Repairs!",
    sub: "Our servers are getting a renovation. We'll be back stronger than ever.",
    tagline: "The foreman says it won't be long.",
  },
};

const defaultMsg = {
  heading: "Something Broke on Site!",
  sub: "An unexpected incident happened on our construction site. The crew is investigating.",
  tagline: "We'll have this fixed before the next inspection!",
};

export default function ServerErrorPage({
  code = 500,
  title,
  message,
}: ServerErrorPageProps) {
  const themed = funMessages[code] ?? defaultMsg;
  const heading = title ?? themed.heading;
  const sub = message ?? themed.sub;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B1F3A] px-4 overflow-hidden">
      <CrackLines />

      {/* Dust particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <DustCloud key={i} delay={i * 0.5} x={-60 + i * 30} size={8 + i * 4} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-xl"
      >
        {/* Swinging wrecking ball */}
        <motion.div
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
          className="mx-auto mb-0 w-20 sm:w-24"
        >
          <WreckingBall className="w-full h-auto" />
        </motion.div>

        {/* Error code with shake */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="block text-[6rem] sm:text-[8rem] font-black leading-none bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent select-none"
        >
          <motion.span
            animate={{ x: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-block"
          >
            {code}
          </motion.span>
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2 flex items-center justify-center gap-2">
            <Wrench className="h-6 w-6 text-red-400" />
            {heading}
          </h1>
          <p className="text-[#b0c4d8] text-base sm:text-lg mb-2 max-w-md mx-auto">
            {sub}
          </p>
          <p className="text-[#7a9ec2] text-sm mb-8 italic">{themed.tagline}</p>
        </motion.div>

        {/* Hazard stripe divider */}
        <div className="relative h-5 mb-8 overflow-hidden rounded" aria-hidden="true">
          <motion.div
            animate={{ x: [0, -160] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-8 h-5"
                style={{
                  background:
                    i % 2 === 0
                      ? "repeating-linear-gradient(45deg, #C9A227, #C9A227 4px, #0B1F3A 4px, #0B1F3A 8px)"
                      : "#0B1F3A",
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-6 gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Retry the Build
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#1a3a5c] text-[#e4e4e7] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#1a3a5c] text-[#e4e4e7] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 gap-2"
          >
            <Link to="/contact">
              <Mail className="h-4 w-4" />
              Call the Foreman
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
