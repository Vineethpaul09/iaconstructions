import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";
import type { NavItem } from "@/types";

// ───────────────────────────── animation variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
} as const;

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ───────────────────────────── Top Bar
const TopBar: React.FC = () => (
  <div className="hidden md:block w-full bg-[#0B1F3A] border-b border-[#C9A227]/15 text-xs text-[#94a3b8]">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
      {/* left */}
      <div className="flex items-center gap-5">
        <a
          href="tel:+17787645123"
          className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors"
        >
          <Phone className="h-3 w-3 text-[#C9A227]" />
          +17787645123
        </a>
        <a
          href="mailto:dinesh@iaconstructions.com"
          className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors"
        >
          <Mail className="h-3 w-3 text-[#C9A227]" />
          dinesh@iaconstructions.com
        </a>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-[#C9A227]" />
          Hyderabad, Telangana
        </span>
      </div>

      {/* right – social */}
      <div className="flex items-center gap-3">
        <a
          href="mailto:dinesh@iaconstructions.com"
          className="hover:text-[#C9A227] transition-colors"
          title="Email"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.instagram.com/iaconstructions.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C9A227] transition-colors"
          title="Instagram"
        >
          <Instagram className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://wa.me/919154450123"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C9A227] transition-colors"
          title="WhatsApp"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

// ───────────────────────────── Desktop Dropdown
interface DesktopDropdownProps {
  item: NavItem;
  isActive: boolean;
}

const DesktopDropdown: React.FC<DesktopDropdownProps> = ({
  item,
  isActive,
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive ? "text-[#C9A227]" : "text-[#e4e4e7] hover:text-[#C9A227]",
        )}
      >
        {item.label}
        {item.children && (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        )}
      </Link>

      {item.children && (
        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 mt-1 w-56 rounded-lg border border-[#1a3a5c] bg-[#071428]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
            >
              {item.children.map((child) => {
                const childActive = location.pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors",
                      childActive
                        ? "text-[#C9A227] bg-[#C9A227]/10"
                        : "text-[#94a3b8] hover:text-[#C9A227] hover:bg-[#C9A227]/5",
                    )}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

// ───────────────────────────── Mobile Accordion Item
interface MobileAccordionProps {
  item: NavItem;
  onClose: () => void;
}

const MobileAccordion: React.FC<MobileAccordionProps> = ({ item, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isActive =
    location.pathname === item.href ||
    item.children?.some((c) => location.pathname === c.href);

  if (!item.children) {
    return (
      <Link
        to={item.href}
        onClick={onClose}
        className={cn(
          "block px-4 py-3 text-base font-medium border-b border-[#1a3a5c]/60 transition-colors",
          isActive ? "text-[#C9A227]" : "text-[#e4e4e7] hover:text-[#C9A227]",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-[#1a3a5c]/60">
      <button
        onClick={() => setExpanded((p) => !p)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3 text-base font-medium transition-colors",
          isActive ? "text-[#C9A227]" : "text-[#e4e4e7] hover:text-[#C9A227]",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              <Link
                to={item.href}
                onClick={onClose}
                className={cn(
                  "block px-8 py-2 text-sm transition-colors",
                  location.pathname === item.href
                    ? "text-[#C9A227]"
                    : "text-[#94a3b8] hover:text-[#C9A227]",
                )}
              >
                All {item.label}
              </Link>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={onClose}
                  className={cn(
                    "block px-8 py-2 text-sm transition-colors",
                    location.pathname === child.href
                      ? "text-[#C9A227]"
                      : "text-[#94a3b8] hover:text-[#C9A227]",
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ───────────────────────────── Main Navbar
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Top info bar ── */}
      <TopBar />

      {/* ── Main navbar ── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-[#0B1F3A]/90 backdrop-blur-xl border-b border-[#1a3a5c]/60 shadow-lg shadow-black/20"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-[#C9A227] via-[#d4b94e] to-[#C9A227] bg-clip-text text-transparent italic">
                  iA
                </span>
                <span className="text-lg lg:text-xl font-semibold text-[#fafafa] tracking-tight">
                  Constructions
                </span>
              </div>
              <span className="text-[9px] lg:text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] mt-0.5">
                Builders &amp; Developers
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                item.children?.some((c) => location.pathname === c.href);
              return (
                <DesktopDropdown
                  key={item.href}
                  item={item}
                  isActive={!!isActive}
                />
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild size="default">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 text-[#e4e4e7] hover:text-[#C9A227] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-[#071428]/60 backdrop-blur-sm"
            />

            {/* drawer */}
            <motion.aside
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-[#071428] border-l border-[#1a3a5c] shadow-2xl overflow-y-auto"
            >
              {/* drawer header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-[#1a3a5c]">
                <div className="flex flex-col leading-none">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold bg-gradient-to-r from-[#C9A227] via-[#d4b94e] to-[#C9A227] bg-clip-text text-transparent italic">
                      iA
                    </span>
                    <span className="text-sm font-semibold text-[#fafafa] tracking-tight">
                      Constructions
                    </span>
                  </div>
                  <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] mt-0.5">
                    Builders &amp; Developers
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-[#94a3b8] hover:text-[#C9A227] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* nav items */}
              <div className="py-2">
                {navigation.map((item) => (
                  <MobileAccordion
                    key={item.href}
                    item={item}
                    onClose={() => setDrawerOpen(false)}
                  />
                ))}
              </div>

              {/* drawer CTA */}
              <div className="px-4 pt-4 pb-8">
                <Button asChild className="w-full" size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>

                {/* contact info in drawer */}
                <div className="mt-6 space-y-3 text-sm text-[#94a3b8]">
                  <a
                    href="tel:+17787645123"
                    className="flex items-center gap-2 hover:text-[#C9A227] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#C9A227]" />
                    +17787645123
                  </a>
                  <a
                    href="mailto:dinesh@iaconstructions.com"
                    className="flex items-center gap-2 hover:text-[#C9A227] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#C9A227]" />
                    dinesh@iaconstructions.com
                  </a>
                </div>

                {/* social */}
                <div className="flex items-center gap-4 mt-6">
                  <a
                    href="mailto:dinesh@iaconstructions.com"
                    className="text-[#94a3b8] hover:text-[#C9A227] transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/iaconstructions.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94a3b8] hover:text-[#C9A227] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/919154450123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94a3b8] hover:text-[#C9A227] transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
