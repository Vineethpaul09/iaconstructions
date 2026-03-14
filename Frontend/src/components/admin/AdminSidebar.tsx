import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  X,
  Building2,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { label: "Client Stories", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: Props) {
  const location = useLocation();
  const { signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex flex-col h-full w-64 bg-[#0B1F3A] border-r border-[#1a3a5c]">
      {/* Brand */}
      <div className="p-5 border-b border-[#1a3a5c] flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2" onClick={onClose}>
          <Building2 className="h-7 w-7 text-[#C9A227]" />
          <div>
            <div className="text-white font-bold text-sm">iA Constructions</div>
            <div className="text-[#7a8fa6] text-xs">Admin Panel</div>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-[#7a8fa6] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              isActive(item.href)
                ? "bg-[#C9A227]/15 text-[#C9A227]"
                : "text-[#e4e4e7] hover:bg-[#0f2847] hover:text-white",
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1a3a5c]">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7a8fa6] hover:bg-[#0f2847] hover:text-white transition-colors mb-1"
        >
          <Building2 className="h-4 w-4" />
          View Site
        </Link>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {signingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden lg:block shrink-0">{sidebar}</div>

      {/* Mobile: overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="relative z-10 h-full">{sidebar}</div>
        </div>
      )}
    </>
  );
}
