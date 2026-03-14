import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useAdminLeads } from "@/hooks/useAdmin";
import { formatPrice } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminLeads() {
  const { leads, loading, deleteLead } = useAdminLeads();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setDeleting(id);
    await deleteLead(id);
    setDeleting(null);
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-[#7a8fa6] text-sm mt-1">
            {leads.length} total leads
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16 bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl">
            <p className="text-[#7a8fa6]">No leads yet</p>
          </div>
        ) : (
          <div className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#1a3a5c] text-xs text-[#7a8fa6] uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Name</th>
                    <th className="text-left px-5 py-3">Contact</th>
                    <th className="text-left px-5 py-3">Intent</th>
                    <th className="text-left px-5 py-3">Budget</th>
                    <th className="text-left px-5 py-3">Date</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-[#1a3a5c]/50 last:border-0 hover:bg-[#0f2847]/50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="text-white text-sm font-medium">
                          {lead.name}
                        </div>
                        <div className="text-[#7a8fa6] text-xs">
                          {lead.location}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-[#e4e4e7] text-sm">
                          {lead.email}
                        </div>
                        <div className="text-[#7a8fa6] text-xs">
                          {lead.country_code} {lead.phone}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-[#e4e4e7] capitalize">
                          {lead.intent}
                        </span>
                        {lead.property_type && (
                          <div className="text-[#7a8fa6] text-xs capitalize">
                            {lead.property_type}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3 text-sm text-[#C9A227]">
                        {lead.budget_min > 0 &&
                          `${formatPrice(lead.budget_min)} – ${formatPrice(lead.budget_max)}`}
                      </td>
                      <td className="px-5 py-3 text-sm text-[#7a8fa6]">
                        {fmtDate(lead.created_at)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={deleting === lead.id}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                        >
                          {deleting === lead.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
