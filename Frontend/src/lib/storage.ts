import { supabase } from "./supabase";

const BUCKET = "project-images";

/**
 * Upload an image file to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadProjectImage(
  file: File,
  projectSlug: string,
): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured");

  const ext = file.name.split(".").pop() ?? "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${projectSlug}/${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage by its public URL.
 */
export async function deleteProjectImage(publicUrl: string): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");

  // Extract the path from the public URL
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // Not a Supabase storage URL, skip

  const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

/**
 * Check if a URL is a Supabase storage URL (vs external like Unsplash).
 */
export function isStorageUrl(url: string): boolean {
  return url.includes(`/storage/v1/object/public/${BUCKET}/`);
}

/**
 * Upload a site asset (logo, favicon, etc.) to Supabase Storage.
 * Returns the public URL.
 */
export async function uploadSiteAsset(
  file: File,
  name: string,
): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured");

  const ext = file.name.split(".").pop() ?? "png";
  const safeName = `${name}-${Date.now()}.${ext}`;
  const path = `site-assets/${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a site asset from Supabase Storage by its public URL.
 */
export async function deleteSiteAsset(publicUrl: string): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;

  const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
