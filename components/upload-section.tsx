"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { insertPhoto } from "@/data/photos";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ImageIcon } from "lucide-react";

export function UploadSection() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (files.length === 0) return;

      setUploading(true);
      setTotalFiles(files.length);
      setProgress(0);
      setMessage(null);

      const supabase = createBrowserClient();
      let completed = 0;
      let errors = 0;

      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("wedding-photos")
          .upload(path, file);

        if (uploadError) {
          errors++;
        } else {
          await insertPhoto(path);
        }

        completed++;
        setProgress(Math.round((completed / files.length) * 100));
      }

      setUploading(false);

      if (errors === 0) {
        setMessage(`${files.length} photo${files.length > 1 ? "s" : ""} uploaded!`);
      } else {
        setMessage(`Uploaded ${completed - errors} of ${files.length} photos. ${errors} failed.`);
      }

      router.refresh();
    },
    [router]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <section id="upload" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your Photos
          </h2>
          <p className="text-gray-500">
            Easily share the snaps you took during our wedding ceremony and
            reception.
          </p>
        </div>

        <div
          className={`drag-zone rounded-xl p-12 text-center bg-gray-50 flex flex-col items-center justify-center ${
            dragging ? "dragging" : ""
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="mb-6 text-brand-purple">
            <ImageIcon className="h-16 w-16 mx-auto" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Drag and drop your photos here
          </h3>
          <p className="text-gray-400 mb-6">
            JPEG, PNG, HEIC, or WebP files (max 20 MB)
          </p>
          <Button
            className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-8"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Select from Device
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/heic,image/webp"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />
        </div>

        {uploading && (
          <div className="mt-8">
            <Progress value={progress} className="h-2.5" />
            <p className="text-sm text-center text-gray-500 mt-2">
              Uploading {totalFiles} photo{totalFiles > 1 ? "s" : ""}...{" "}
              {progress}%
            </p>
          </div>
        )}

        {message && !uploading && (
          <p className="text-sm text-center text-brand-purple font-semibold mt-6">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
