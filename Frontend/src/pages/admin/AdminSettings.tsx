import { useState, useRef } from "react";
import { Save, Loader2, Upload, X } from "lucide-react";
import { useAdminSettings } from "@/hooks/useAdmin";
import { uploadSiteAsset, deleteSiteAsset, isStorageUrl } from "@/lib/storage";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminSettings() {
  const { settings, loading, updateSetting } = useAdminSettings();
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Local state mirrors for editing
  const [hero, setHero] = useState<{ title: string; subtitle: string } | null>(
    null,
  );
  const [company, setCompany] = useState<{
    phone: string;
    headerPhone: string;
    email: string;
    whatsapp: string;
    address: string;
    mapEmbedUrl: string;
    logoUrl: string;
  } | null>(null);
  const [social, setSocial] = useState<{
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  } | null>(null);

  // Initialize local state from fetched settings
  const getHero = () =>
    hero ??
    (settings.hero as { title: string; subtitle: string } | undefined) ?? {
      title: "",
      subtitle: "",
    };
  const getCompany = () =>
    company ??
    (settings.company as
      | {
          phone: string;
          headerPhone: string;
          email: string;
          whatsapp: string;
          address: string;
          mapEmbedUrl: string;
          logoUrl: string;
        }
      | undefined) ?? {
      phone: "",
      headerPhone: "",
      email: "",
      whatsapp: "",
      address: "",
      mapEmbedUrl: "",
      logoUrl: "",
    };
  const getSocial = () =>
    social ??
    (settings.social as
      | {
          facebook: string;
          instagram: string;
          twitter: string;
          youtube: string;
        }
      | undefined) ?? { facebook: "", instagram: "", twitter: "", youtube: "" };

  const handleSave = async (key: string, value: Record<string, unknown>) => {
    setSaving(key);
    setMsg("");
    try {
      await updateSetting(key, value);
      setMsg(`${key} settings saved!`);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(`Error: ${err instanceof Error ? err.message : "Failed to save"}`);
    }
    setSaving(null);
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
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-[#7a8fa6] text-sm mt-1">
            Configure your website content
          </p>
        </div>

        {msg && (
          <div
            className={`px-4 py-2 rounded-lg text-sm ${msg.startsWith("Error") ? "bg-red-500/10 text-red-400 border border-red-500/30" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"}`}
          >
            {msg}
          </div>
        )}

        {/* Hero Section Settings */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Hero Section</h2>
            <button
              onClick={() => handleSave("hero", getHero())}
              disabled={saving === "hero"}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving === "hero" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={getHero().title}
                onChange={(e) =>
                  setHero({ ...getHero(), title: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Subtitle
              </label>
              <input
                type="text"
                value={getHero().subtitle}
                onChange={(e) =>
                  setHero({ ...getHero(), subtitle: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Company Info Settings */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Company Information
            </h2>
            <button
              onClick={() => handleSave("company", getCompany())}
              disabled={saving === "company"}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving === "company" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Phone (Footer / General)
              </label>
              <input
                type="text"
                value={getCompany().phone}
                onChange={(e) =>
                  setCompany({ ...getCompany(), phone: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Phone (Header / Navbar)
              </label>
              <input
                type="text"
                value={getCompany().headerPhone}
                onChange={(e) =>
                  setCompany({ ...getCompany(), headerPhone: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                placeholder="Leave empty to use general phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={getCompany().email}
                onChange={(e) =>
                  setCompany({ ...getCompany(), email: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={getCompany().whatsapp}
                onChange={(e) =>
                  setCompany({ ...getCompany(), whatsapp: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                placeholder="919876543210 (no + prefix)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={getCompany().address}
                onChange={(e) =>
                  setCompany({ ...getCompany(), address: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
              Google Maps Embed URL
            </label>
            <input
              type="url"
              value={getCompany().mapEmbedUrl}
              onChange={(e) =>
                setCompany({ ...getCompany(), mapEmbedUrl: e.target.value })
              }
              className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-[#7a8fa6] mt-1">
              Paste the embed URL from Google Maps (Share → Embed → copy src
              URL)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5">
              Logo Image
            </label>
            {getCompany().logoUrl ? (
              <div className="flex items-center gap-4">
                <div className="relative group h-16 bg-[#071428] border border-[#1a3a5c] rounded-lg p-2 flex items-center">
                  <img
                    src={getCompany().logoUrl}
                    alt="Logo preview"
                    className="h-full w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      const url = getCompany().logoUrl;
                      if (isStorageUrl(url)) {
                        try {
                          await deleteSiteAsset(url);
                        } catch {
                          /* ignore */
                        }
                      }
                      setCompany({ ...getCompany(), logoUrl: "" });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500/90 hover:bg-red-600 rounded-full p-1 transition-colors"
                    title="Remove logo"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
                <span className="text-xs text-[#7a8fa6]">
                  Click × to remove and use text logo instead
                </span>
              </div>
            ) : (
              <div>
                <input
                  ref={logoFileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setLogoUploading(true);
                    try {
                      const url = await uploadSiteAsset(file, "logo");
                      setCompany({ ...getCompany(), logoUrl: url });
                    } catch (err) {
                      setMsg(
                        `Error: ${err instanceof Error ? err.message : "Upload failed"}`,
                      );
                    }
                    setLogoUploading(false);
                    if (logoFileRef.current) logoFileRef.current.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => logoFileRef.current?.click()}
                  disabled={logoUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#1a3a5c] hover:border-[#C9A227]/50 rounded-lg text-sm text-[#e4e4e7] hover:text-[#C9A227] transition-colors w-full justify-center"
                >
                  {logoUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" /> Upload Logo Image
                    </>
                  )}
                </button>
                <p className="text-xs text-[#7a8fa6] mt-1">
                  PNG, JPG, SVG or WebP. Leave empty to use the default text
                  logo (iA Constructions)
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Social Links Settings */}
        <section className="bg-[#0B1F3A] border border-[#1a3a5c] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Social Links</h2>
            <button
              onClick={() => handleSave("social", getSocial())}
              disabled={saving === "social"}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#C9A227] hover:bg-[#d4b94e] text-[#0B1F3A] text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving === "social" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(["facebook", "instagram", "twitter", "youtube"] as const).map(
              (platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-[#e4e4e7] mb-1.5 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={getSocial()[platform]}
                    onChange={(e) =>
                      setSocial({ ...getSocial(), [platform]: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#071428] border border-[#1a3a5c] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                    placeholder={`https://${platform}.com/...`}
                  />
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
