import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useAdminProjects } from "@/hooks/useAdmin";
import ImageUploader from "@/components/admin/ImageUploader";
import AdminLayout from "@/components/admin/AdminLayout";
import type { ProjectRow } from "@/types/supabase";

const PROJECT_TYPES = [
  "villa",
  "home",
  "apartment",
  "commercial",
  "bungalow",
  "penthouse",
  "plot",
];

const PROJECT_STATUSES = ["ongoing", "completed", "upcoming"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type FormData = Omit<ProjectRow, "id" | "created_at" | "updated_at">;

const emptyForm: FormData = {
  name: "",
  slug: "",
  description: "",
  type: "apartment",
  status: "ongoing",
  price: 0,
  area_sqft: 0,
  location: "",
  address: "",
  bedrooms: 0,
  bathrooms: 0,
  images: [],
  featured: false,
  rera_number: "",
  possession_date: "",
};

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id && id !== "new";
  const navigate = useNavigate();
  const { createProject, updateProject, getProject } = useAdminProjects();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  useEffect(() => {
    if (!isEditing) return;
    getProject(id).then((data) => {
      if (data) {
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          type: data.type,
          status: data.status,
          price: data.price,
          area_sqft: data.area_sqft,
          location: data.location,
          address: data.address,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          images: data.images ?? [],
          featured: data.featured,
          rera_number: data.rera_number,
          possession_date: data.possession_date,
        });
      }
      setLoading(false);
    });
  }, [id, isEditing]);

  const handleChange = (field: keyof FormData, value: unknown) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && autoSlug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Project name is required");
      return;
    }
    if (!form.slug.trim()) {
      setError("Slug is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (isEditing) {
        await updateProject(id, form);
      } else {
        await createProject(form);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
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
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="p-2 rounded-lg hover:bg-[#0f2847] text-[#7a8fa6] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h1>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save Project"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
                placeholder="e.g. IAC Serenity Villa"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Slug *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    handleChange("slug", e.target.value);
                  }}
                  required
                  className="flex-1 px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
                  placeholder="iac-serenity-villa"
                />
                {!autoSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSlug(true);
                      handleChange("slug", slugify(form.name));
                    }}
                    className="text-xs text-[#C9A227] hover:underline whitespace-nowrap"
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors resize-none"
                placeholder="Describe the project…"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Type *
              </label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Status *
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Details</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                min={0}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Area (sq.ft)
              </label>
              <input
                type="number"
                value={form.area_sqft || ""}
                onChange={(e) =>
                  handleChange("area_sqft", Number(e.target.value))
                }
                min={0}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Bedrooms
              </label>
              <input
                type="number"
                value={form.bedrooms || ""}
                onChange={(e) =>
                  handleChange("bedrooms", Number(e.target.value))
                }
                min={0}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Bathrooms
              </label>
              <input
                type="number"
                value={form.bathrooms || ""}
                onChange={(e) =>
                  handleChange("bathrooms", Number(e.target.value))
                }
                min={0}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
                placeholder="e.g. Bandlaguda, Hyderabad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Full Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
                placeholder="Survey No. 142, Bandlaguda Jagir Main Road"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                RERA Number
              </label>
              <input
                type="text"
                value={form.rera_number}
                onChange={(e) => handleChange("rera_number", e.target.value)}
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
                placeholder="TS-RERA/PRJ/HYD/2025/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Possession Date
              </label>
              <input
                type="date"
                value={form.possession_date}
                onChange={(e) =>
                  handleChange("possession_date", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-colors"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="w-4 h-4 rounded border-[#1a3a5c] bg-[#071428] text-[#C9A227] focus:ring-[#C9A227]"
            />
            <span className="text-sm text-[#e4e4e7]">
              Featured project (shown on homepage)
            </span>
          </label>
        </section>

        {/* Images */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5">
          <ImageUploader
            images={form.images as string[]}
            onChange={(imgs) => handleChange("images", imgs)}
            projectSlug={form.slug || "temp"}
          />
        </section>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save Project"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-6 py-2.5 text-sm text-[#7a8fa6] hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
