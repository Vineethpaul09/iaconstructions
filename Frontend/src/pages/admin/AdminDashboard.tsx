import {
  FolderKanban,
  Users,
  MessageSquare,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminStats } from "@/hooks/useAdmin";
import AdminLayout from "@/components/admin/AdminLayout";

const statCards = [
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
    href: "/admin/projects",
    color: "text-[#C9A227]",
  },
  {
    key: "leads",
    label: "Leads",
    icon: Users,
    href: "/admin/leads",
    color: "text-blue-400",
  },
  {
    key: "contacts",
    label: "Contact Messages",
    icon: MessageSquare,
    href: "/admin/contacts",
    color: "text-emerald-400",
  },
  {
    key: "subscribers",
    label: "Subscribers",
    icon: Mail,
    href: "/admin/subscribers",
    color: "text-purple-400",
  },
] as const;

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[#7a8fa6] text-sm mt-1">
            Overview of your website data
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.key}
              to={card.href}
              className="bg-[#0B1F3A] border border-[#1a3a5c] hover:border-[#C9A227]/30 rounded-xl p-5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <ArrowUpRight className="h-4 w-4 text-[#7a8fa6] group-hover:text-[#C9A227] transition-colors" />
              </div>
              <div className="text-3xl font-bold text-white">
                {loading ? "—" : stats[card.key]}
              </div>
              <div className="text-sm text-[#7a8fa6] mt-1">{card.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/projects/new"
              className="px-4 py-2 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] font-medium text-sm rounded-lg transition-colors"
            >
              + Add Project
            </Link>
            <Link
              to="/admin/settings"
              className="px-4 py-2 bg-[#0f2847] hover:bg-[#122d4d] text-white text-sm rounded-lg border border-[#1a3a5c] transition-colors"
            >
              Edit Settings
            </Link>
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 bg-[#0f2847] hover:bg-[#122d4d] text-white text-sm rounded-lg border border-[#1a3a5c] transition-colors"
            >
              View Website →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
