import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Loader2,
  Edit2,
  X,
} from "lucide-react";
import { useAdminTestimonials } from "@/hooks/useAdmin";
import { useProjects } from "@/hooks/useSupabase";
import AdminLayout from "@/components/admin/AdminLayout";
import type { TestimonialRow } from "@/types/supabase";

/* ── Status badge ──────────────────────────────────────────── */

const StatusBadge: React.FC<{ status: TestimonialRow["status"] }> = ({
  status,
}) => {
  const config = {
    pending: {
      icon: Clock,
      label: "Pending",
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    approved: {
      icon: CheckCircle2,
      label: "Approved",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      cls: "bg-red-500/10 text-red-400 border-red-500/30",
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.cls}`}
    >
      <config.icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};

/* ── Star rating display ───────────────────────────────────── */

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating
            ? "fill-[#C9A227] text-[#C9A227]"
            : "fill-none text-[#1a3a5c]"
        }`}
      />
    ))}
  </div>
);

/* ── Star rating input ─────────────────────────────────────── */

const StarRatingInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="transition-transform hover:scale-110"
      >
        <Star
          className={`h-5 w-5 cursor-pointer ${
            i < value
              ? "fill-[#C9A227] text-[#C9A227]"
              : "fill-none text-[#1a3a5c] hover:text-[#C9A227]/50"
          }`}
        />
      </button>
    ))}
  </div>
);

/* ── Create / Edit Modal ───────────────────────────────────── */

interface FormData {
  name: string;
  designation: string;
  rating: number;
  comment: string;
  project: string;
  status: TestimonialRow["status"];
}

const TestimonialFormModal: React.FC<{
  initial?: TestimonialRow;
  onSave: (data: FormData) => Promise<void>;
  onClose: () => void;
}> = ({ initial, onClose, onSave }) => {
  const { projects } = useProjects();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? "",
    designation: initial?.designation ?? "",
    rating: initial?.rating ?? 5,
    comment: initial?.comment ?? "",
    project: initial?.project ?? "",
    status: initial?.status ?? "approved",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">
            {initial ? "Edit Testimonial" : "Add Client Story"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#7a8fa6] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
                Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
                Designation
              </label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
              Project
            </label>
            <select
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              className="w-full px-3 py-2 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227]"
            >
              <option value="">None</option>
              {projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
              Rating
            </label>
            <StarRatingInput
              value={form.rating}
              onChange={(v) => setForm({ ...form, rating: v })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as TestimonialRow["status"],
                })
              }
              className="w-full px-3 py-2 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227]"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1">
              Testimonial *
            </label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={4}
              required
              className="w-full px-3 py-2 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#e4e4e7] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {initial ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Filter tabs ───────────────────────────────────────────── */

type FilterTab = "all" | "pending" | "approved" | "rejected";

/* ── Main Page ─────────────────────────────────────────────── */

export default function AdminTestimonials() {
  const {
    testimonials,
    loading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useAdminTestimonials();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);

  const filtered =
    activeTab === "all"
      ? testimonials
      : testimonials.filter((t) => t.status === activeTab);

  const counts = {
    all: testimonials.length,
    pending: testimonials.filter((t) => t.status === "pending").length,
    approved: testimonials.filter((t) => t.status === "approved").length,
    rejected: testimonials.filter((t) => t.status === "rejected").length,
  };

  const handleCreate = async (data: FormData) => {
    await createTestimonial({ ...data, source: "admin" });
    setShowForm(false);
  };

  const handleUpdate = async (data: FormData) => {
    if (!editing) return;
    await updateTestimonial(editing.id, data);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Client Stories</h1>
            <p className="text-[#7a8fa6] text-sm mt-1">
              Manage testimonials and client reviews
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Story
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-[#071428] rounded-lg p-1 w-fit">
          {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-[#C9A227]/15 text-[#C9A227]"
                  : "text-[#7a8fa6] hover:text-white"
              }`}
            >
              {tab}
              <span className="ml-1.5 text-xs opacity-70">({counts[tab]})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#7a8fa6]">
            No testimonials in this category.
          </div>
        ) : (
          <div className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a3a5c] text-[#7a8fa6] text-left">
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Testimonial</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a3a5c]">
                  {filtered.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-[#0f2847]/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium">{t.name}</p>
                          {t.designation && (
                            <p className="text-[#7a8fa6] text-xs">
                              {t.designation}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-[#e4e4e7] text-xs line-clamp-2">
                          {t.comment}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <StarRating rating={t.rating} />
                      </td>
                      <td className="px-4 py-3">
                        {t.project ? (
                          <span className="text-[#C9A227] text-xs">
                            {t.project}
                          </span>
                        ) : (
                          <span className="text-[#7a8fa6] text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[#7a8fa6] text-xs capitalize">
                          {t.source}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {t.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateTestimonial(t.id, {
                                    status: "approved",
                                  })
                                }
                                className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                                title="Approve"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  updateTestimonial(t.id, {
                                    status: "rejected",
                                  })
                                }
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Reject"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {t.status === "rejected" && (
                            <button
                              onClick={() =>
                                updateTestimonial(t.id, { status: "approved" })
                              }
                              className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
                          {t.status === "approved" && (
                            <button
                              onClick={() =>
                                updateTestimonial(t.id, { status: "rejected" })
                              }
                              className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors"
                              title="Unpublish"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setEditing(t)}
                            className="p-1.5 rounded-lg text-[#7a8fa6] hover:text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-1.5 rounded-lg text-[#7a8fa6] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create modal */}
      {showForm && (
        <TestimonialFormModal
          onSave={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit modal */}
      {editing && (
        <TestimonialFormModal
          initial={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </AdminLayout>
  );
}
