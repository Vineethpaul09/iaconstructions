import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, GripVertical } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartTime = useRef<number | null>(null);
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
        if (import.meta.env.DEV)
          console.error("Failed to delete from storage:", err);
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

  const scrollToIndex = (idx: number) => {
    const container = previewRef.current;
    if (!container) return;
    const child = container.children[idx] as HTMLElement | undefined;
    if (child) {
      // center using child center relative to container
      const target =
        child.offsetLeft + child.clientWidth / 2 - container.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, Math.round(target)),
        behavior: "smooth",
      });
    }
    setPreviewIdx(idx);
  };

  const onPointerDown = (e: any) => {
    pointerStartX.current = e.clientX;
    pointerStartTime.current = performance.now();
    try {
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    } catch {}
  };

  const onPointerUp = (e: any) => {
    if (pointerStartX.current == null || pointerStartTime.current == null) {
      pointerStartX.current = null;
      pointerStartTime.current = null;
      return;
    }
    const dx = e.clientX - pointerStartX.current;
    const dt = performance.now() - pointerStartTime.current;
    const velocity = dx / Math.max(1, dt);
    const vThreshold = 0.5;
    if (Math.abs(velocity) > vThreshold) {
      if (velocity < 0)
        scrollToIndex(Math.min(images.length - 1, previewIdx + 1));
      else scrollToIndex(Math.max(0, previewIdx - 1));
    } else {
      handleScroll();
    }
    pointerStartX.current = null;
    pointerStartTime.current = null;
  };

  useEffect(() => {
    if (!previewOpen) return;
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollToIndex(Math.max(0, previewIdx - 1));
      if (e.key === "ArrowRight")
        scrollToIndex(Math.min(images.length - 1, previewIdx + 1));
    };
    window.addEventListener("keydown", handleArrows);
    return () => window.removeEventListener("keydown", handleArrows);
  }, [previewOpen, previewIdx, images.length]);

  // scroll to selected image when opening preview
  useEffect(() => {
    if (!previewOpen) return;
    // focus preview container so keyboard arrows work immediately
    previewRef.current?.focus();
    const t = setTimeout(() => scrollToIndex(previewIdx), 70);
    return () => clearTimeout(t);
  }, [previewOpen]);

  // ensure we scroll when index changes
  useEffect(() => {
    if (!previewOpen) return;
    scrollToIndex(previewIdx);
  }, [previewIdx]);

  const handleScroll = () => {
    const container = previewRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const d = Math.abs(childCenter - center);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = idx;
      }
    });
    setPreviewIdx(nearest);
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
                className="w-full h-full object-cover cursor-pointer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/400x300/0B1F3A/C9A227?text=Error";
                }}
                onClick={() => {
                  setPreviewIdx(i);
                  setPreviewOpen(true);
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

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          className="max-w-none w-[80vw] h-[80vh] p-0"
          onClose={() => setPreviewOpen(false)}
        >
          <div className="relative h-full w-full">
            <div
              ref={previewRef}
              onScroll={handleScroll}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft")
                  scrollToIndex(Math.max(0, previewIdx - 1));
                if (e.key === "ArrowRight")
                  scrollToIndex(Math.min(images.length - 1, previewIdx + 1));
                if (e.key === "Escape") setPreviewOpen(false);
              }}
              tabIndex={0}
              className="h-full w-full flex gap-3 overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-hide"
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[80vw] h-full snap-center rounded overflow-hidden bg-black/10 flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="max-w-[80vw] max-h-[80vh] object-contain bg-black"
                    onLoad={() => {
                      if (i === previewIdx) scrollToIndex(previewIdx);
                    }}
                    onClick={() =>
                      scrollToIndex((i + 1) % (images.length || 1))
                    }
                  />
                </div>
              ))}
            </div>

            {images && images.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  onClick={() => scrollToIndex(Math.max(0, previewIdx - 1))}
                  className="absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-[#071428]/60 p-2 text-white"
                >
                  ‹
                </button>
                <button
                  aria-label="Next"
                  onClick={() =>
                    scrollToIndex(Math.min(images.length - 1, previewIdx + 1))
                  }
                  className="absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-[#071428]/60 p-2 text-white"
                >
                  ›
                </button>
              </>
            )}
            {/* Counter */}
            <div className="absolute left-1/2 top-3 z-50 -translate-x-1/2 text-sm text-[#e4e4e7] opacity-90">
              {previewIdx + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            {images && images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 flex gap-2 overflow-x-auto px-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPreviewIdx(i);
                      scrollToIndex(i);
                    }}
                    className={`rounded-md overflow-hidden border-2 ${i === previewIdx ? "border-[#C9A227]" : "border-transparent"}`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="h-10 w-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
