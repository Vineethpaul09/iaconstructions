import { useState, useRef } from "react";
import { Upload, X, Loader2, GripVertical } from "lucide-react";
import {
  uploadProjectImage,
  deleteProjectImage,
  isStorageUrl,
} from "@/lib/storage";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  projectSlug: string;
}

export default function ImageUploader({
  images,
  onChange,
  projectSlug,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(
          `"${file.name}" is not a supported image format. Use JPEG, PNG, WebP, or GIF.`,
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`"${file.name}" exceeds the 10MB size limit.`);
        return;
      }
    }

    setUploading(true);

    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadProjectImage(file, projectSlug || "temp");
        newUrls.push(url);
      } catch (err) {
        if (import.meta.env.DEV) console.error("Upload failed:", err);
      }
    }

    onChange([...images, ...newUrls]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = async (index: number) => {
    const url = images[index];
    // Delete from storage if it's a Supabase URL
    if (isStorageUrl(url)) {
      try {
        await deleteProjectImage(url);
      } catch (err) {
        if (import.meta.env.DEV) console.error("Failed to delete from storage:", err);
      }
    }
    onChange(images.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDragIdx(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === index) return;

    const reordered = [...images];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(index, 0, moved);
    setDragIdx(index);
    onChange(reordered);
  };

  const handleDragEnd = () => {
    setDragIdx(null);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#e4e4e7]">
        Project Images
      </label>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              className={`relative group aspect-[4/3] rounded-lg overflow-hidden border border-[#1a3a5c] cursor-grab active:cursor-grabbing ${
                dragIdx === i ? "opacity-50 ring-2 ring-[#C9A227]" : ""
              }`}
            >
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/400x300/0B1F3A/C9A227?text=Error";
                }}
              />

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-white/80" />
                  <button
                    type="button"
                    onClick={() => handleRemove(i)}
                    className="bg-red-500/90 hover:bg-red-600 rounded-full p-1.5 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Index badge */}
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-[#C9A227] text-[#0B1F3A] text-xs font-bold px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          aria-label="Upload project images"
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#1a3a5c] hover:border-[#C9A227]/50 rounded-lg text-sm text-[#e4e4e7] hover:text-[#C9A227] transition-colors w-full justify-center"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Images
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-[#7a8fa6]">
        Drag images to reorder. First image is the cover photo. Supports JPG,
        PNG, WebP.
      </p>
    </div>
  );
}
