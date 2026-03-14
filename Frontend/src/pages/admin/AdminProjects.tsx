import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, Loader2 } from "lucide-react";
import { useAdminProjects } from "@/hooks/useAdmin";
import { formatPrice } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";

const statusColors: Record<string, string> = {
  ongoing: "bg-amber-500/20 text-amber-400",
  completed: "bg-emerald-500/20 text-emerald-400",
  upcoming: "bg-blue-500/20 text-blue-400",
};

export default function AdminProjects() {
  const { projects, loading, deleteProject } = useAdminProjects();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteProject(id);
    } catch (err) {
      console.error(err);
    }
    setDeleting(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-[#7a8fa6] text-sm mt-1">
              {projects.length} total projects
            </p>
          </div>
          <Link
            to="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] font-semibold text-sm rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#C9A227] animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl">
            <p className="text-[#7a8fa6] mb-4">No projects yet</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A227] text-[#0B1F3A] font-medium text-sm rounded-lg"
            >
              <Plus className="h-4 w-4" />
              Create First Project
            </Link>
          </div>
        ) : (
          <div className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-[#1a3a5c] text-xs text-[#7a8fa6] uppercase tracking-wider">
              <div className="col-span-4">Project</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Rows */}
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 border-b border-[#1a3a5c]/50 last:border-0 hover:bg-[#0f2847]/50 transition-colors items-center"
              >
                {/* Project info */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="w-12 h-9 rounded-md overflow-hidden shrink-0 bg-[#071428]">
                    {(project.images as string[])?.[0] && (
                      <img
                        src={(project.images as string[])[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-sm truncate flex items-center gap-1.5">
                      {project.name}
                      {project.featured && (
                        <Star className="h-3 w-3 text-[#C9A227] fill-[#C9A227]" />
                      )}
                    </div>
                    <div className="text-[#7a8fa6] text-xs truncate">
                      {project.location}
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="md:col-span-2">
                  <span className="text-[#e4e4e7] text-sm capitalize">
                    {project.type}
                  </span>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[project.status] ?? ""}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Price */}
                <div className="md:col-span-2">
                  <span className="text-[#C9A227] font-medium text-sm">
                    {formatPrice(project.price)}
                  </span>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center gap-2 md:justify-end">
                  <Link
                    to={`/admin/projects/${project.id}`}
                    className="p-2 rounded-lg hover:bg-[#C9A227]/10 text-[#C9A227] transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    disabled={deleting === project.id}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === project.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
