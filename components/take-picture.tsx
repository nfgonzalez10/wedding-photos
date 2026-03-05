"use client";

import { Button } from "@/components/ui/button";
import { insertPhoto } from "@/data/photos";
import { createBrowserClient } from "@/lib/supabase/client";
import { CameraIcon, SwitchCameraIcon, RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

type CameraState = "idle" | "active" | "preview" | "uploading";

export function TakePictureSection() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);

  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const openCamera = useCallback(() => {
    setCapturedImage(null);
    setMessage(null);
    setCameraState("active");
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setCameraState("preview");
    }
  }, []);

  const retake = useCallback(() => {
    setCapturedImage(null);
    setMessage(null);
    setCameraState("active");
  }, []);

  const toggleCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  const uploadPhoto = useCallback(async () => {
    if (!capturedImage) return;

    setCameraState("uploading");
    setMessage(null);

    try {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

      const supabase = createBrowserClient();
      const { error } = await supabase.storage
        .from("wedding-photos")
        .upload(path, blob, { contentType: "image/jpeg" });

      if (error) {
        setMessage("Upload failed. Please try again.");
      } else {
        await insertPhoto(path);
        setMessage("Photo uploaded!");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    }

    setCapturedImage(null);
    setCameraState("idle");
    router.refresh();
  }, [capturedImage, router]);

  return (
    <section id="take-picture" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Take a Picture
          </h2>
          <p className="text-gray-500">
            Capture the moment and share it with us by taking a photo right now!
          </p>
        </div>

        {/* Idle state */}
        {cameraState === "idle" && (
          <div className="rounded-xl p-12 text-center bg-gray-50 flex flex-col items-center justify-center">
            <div className="mb-6 text-brand-purple">
              <CameraIcon className="h-16 w-16 mx-auto" strokeWidth={1.5} />
            </div>
            <p className="text-gray-400 mb-6">
              Use your camera to snap a photo
            </p>
            <Button
              className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-8"
              onClick={openCamera}
            >
              Open Camera
            </Button>
          </div>
        )}

        {/* Live camera */}
        {cameraState === "active" && (
          <div className="rounded-xl overflow-hidden bg-black flex flex-col items-center">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.92}
              videoConstraints={{ facingMode }}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="flex gap-4 py-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20"
                onClick={toggleCamera}
              >
                <SwitchCameraIcon className="h-5 w-5" />
              </Button>
              <Button
                className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full px-8"
                onClick={capture}
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                Capture
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20"
                onClick={() => setCameraState("idle")}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Preview captured photo */}
        {cameraState === "preview" && capturedImage && (
          <div className="rounded-xl overflow-hidden bg-black flex flex-col items-center">
            <img
              src={capturedImage}
              alt="Captured preview"
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="flex gap-4 py-4">
              <Button
                variant="outline"
                className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20"
                onClick={retake}
              >
                <RotateCcwIcon className="h-5 w-5 mr-2" />
                Retake
              </Button>
              <Button
                className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full px-8"
                onClick={uploadPhoto}
              >
                Upload Photo
              </Button>
            </div>
          </div>
        )}

        {/* Uploading state */}
        {cameraState === "uploading" && (
          <div className="rounded-xl p-12 text-center bg-gray-50 flex flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple border-t-transparent mb-4" />
            <p className="text-gray-500">Uploading your photo…</p>
          </div>
        )}

        {message && cameraState === "idle" && (
          <p className="text-sm text-center text-brand-purple font-semibold mt-6">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
