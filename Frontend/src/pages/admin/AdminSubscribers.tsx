import { useState } from "react";
import { Trash2, Loader2, Copy, Check } from "lucide-react";
import { useAdminSubscribers } from "@/hooks/useAdmin";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminSubscribers() {
  const { subscribers, loading, deleteSubscriber } = useAdminSubscribers();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    setDeleting(id);
    await deleteSubscriber(id);
    setDeleting(null);
  };

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Newsletter Subscribers
            </h1>
            <p className="text-[#7a8fa6] text-sm mt-1">
              {subscribers.length} subscribers
            </p>
          </div>
          {subscribers.length > 0 && (
            <button
              onClick={copyAllEmails}
              className="flex items-center gap-2 px-4 py-2 bg-[#0f2847] hover:bg-[#122d4d] border border-[#1a3a5c] rounded-lg text-sm text-[#e4e4e7] transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy All Emails"}
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-16 bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl">
            <p className="text-[#7a8fa6]">No subscribers yet</p>
          </div>
        ) : (
          <div className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a3a5c] text-xs text-[#7a8fa6] uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Email</th>
                    <th className="text-left px-5 py-3">Subscribed</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-[#1a3a5c]/50 last:border-0 hover:bg-[#0f2847]/50 transition-colors"
                    >
                      <td className="px-5 py-3 text-sm text-[#e4e4e7]">
                        {sub.email}
                      </td>
                      <td className="px-5 py-3 text-sm text-[#7a8fa6]">
                        {fmtDate(sub.created_at)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          disabled={deleting === sub.id}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                        >
                          {deleting === sub.id ? (
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
