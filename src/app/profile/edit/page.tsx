"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";

export default function EditProfile() {
  const router = useRouter();
  const { photo, setPhoto } = useProfile();

  const [tempPhoto, setTempPhoto] = useState<string | null>(photo);
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setTempPhoto(previewUrl);
  };

  const handleSave = () => {
    setSaving(true);

    // simulate save delay (later replace with API call)
    setTimeout(() => {
      setPhoto(tempPhoto);
      setSaving(false);

      // 🔙 go back to previous page
      router.back();
    }, 600);
  };

  const hasChanges = tempPhoto !== photo;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-xl font-medium mb-6">Edit Profile</h2>

      <div className="flex flex-col items-center gap-5">
        {/* PROFILE PHOTO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 rounded-full overflow-hidden border"
        >
          {tempPhoto ? (
            <motion.img
              key={tempPhoto}
              src={tempPhoto}
              alt="profile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">
              👤
            </div>
          )}
        </motion.div>

        {/* CHANGE PHOTO */}
        <label className="cursor-pointer text-indigo-500 hover:underline">
          Change Profile Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>

        {/* REMOVE PHOTO */}
        {tempPhoto && (
          <button
            onClick={() => setTempPhoto(null)}
            className="text-red-500 hover:underline"
          >
            Remove Profile Photo
          </button>
        )}

        {/* SAVE BUTTON */}
        <AnimatePresence>
          {hasChanges && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              onClick={handleSave}
              disabled={saving}
              className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
