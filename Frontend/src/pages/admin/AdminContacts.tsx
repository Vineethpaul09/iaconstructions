import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useAdminContacts } from "@/hooks/useAdmin";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminContacts() {
  const { contacts, loading, deleteContact } = useAdminContacts();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setDeleting(id);
    await deleteContact(id);
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
          <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-[#7a8fa6] text-sm mt-1">
            {contacts.length} total messages
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl">
            <p className="text-[#7a8fa6]">No contact messages yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-[#0f2847]/50 transition-colors"
                  onClick={() =>
                    setExpanded(expanded === msg.id ? null : msg.id)
                  }
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white font-medium">{msg.name}</span>
                      <span className="text-[#7a8fa6]">·</span>
                      <span className="text-[#7a8fa6] truncate">
                        {msg.subject || "No subject"}
                      </span>
                    </div>
                    <div className="text-xs text-[#7a8fa6] mt-0.5">
                      {msg.email} · {fmtDate(msg.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(msg.id);
                      }}
                      disabled={deleting === msg.id}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                    >
                      {deleting === msg.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {expanded === msg.id && (
                  <div className="px-5 pb-4 border-t border-[#1a3a5c]">
                    <div className="grid grid-cols-2 gap-3 py-3 text-sm">
                      <div>
                        <span className="text-[#7a8fa6]">Phone: </span>
                        <span className="text-[#e4e4e7]">
                          {msg.country_code} {msg.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#7a8fa6]">Email: </span>
                        <span className="text-[#e4e4e7]">{msg.email}</span>
                      </div>
                    </div>
                    <div className="text-sm text-[#e4e4e7] whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
