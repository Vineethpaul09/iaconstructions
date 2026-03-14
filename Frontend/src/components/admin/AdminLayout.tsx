import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#071428] flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-[#0B1F3A] border-b border-[#1a3a5c] px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white hover:text-[#C9A227] transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-auto text-sm text-[#7a8fa6]">{user?.email}</div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
