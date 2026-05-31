"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Edit2, Save, X, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { profileStore, photoStore, defaultProfile } from "@/lib/store";
import type { Measurements, UserPhoto, PhotoType, Size } from "@/lib/store";
import { recommendSize } from "@/lib/sizing";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const PHOTO_SLOTS: { type: PhotoType; label: string; badge?: string }[] = [
  { type: "front", label: "Front",  badge: "Used for Try-On" },
  { type: "side",  label: "Side"  },
  { type: "back",  label: "Back"  },
];

function confidenceColor(c: "high" | "medium" | "low") {
  return c === "high" ? "#22C55E" : c === "medium" ? "#F97316" : "#EF4444";
}

function fitLabel(f: "perfect" | "slightly_small" | "slightly_large") {
  return f === "perfect" ? "Perfect" : f === "slightly_small" ? "Slightly small" : "Slightly large";
}

function fitColor(f: "perfect" | "slightly_small" | "slightly_large") {
  return f === "perfect" ? "#22C55E" : "#F97316";
}

export default function ProfileTab() {
  const [profile, setProfile] = useState<Measurements>(defaultProfile);
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Measurements>(defaultProfile);
  const [saved, setSaved] = useState(false);
  const fileRefs = useRef<Record<PhotoType, HTMLInputElement | null>>({ front: null, side: null, back: null });

  useEffect(() => {
    setProfile(profileStore.get());
    setPhotos(photoStore.get());
  }, []);

  function startEdit() {
    setForm({ ...profile });
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function saveProfile() {
    profileStore.set(form);
    setProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function numField(key: keyof Measurements, val: string) {
    const n = val === "" ? null : parseFloat(val);
    setForm((prev) => ({ ...prev, [key]: isNaN(n as number) ? null : n }));
  }

  function handlePhotoUpload(type: PhotoType, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newPhoto: UserPhoto = {
        id: `${type}_${Date.now()}`,
        type,
        dataUrl,
        createdAt: new Date().toISOString(),
      };
      setPhotos((prev) => {
        const filtered = prev.filter((p) => p.type !== type);
        const updated = [...filtered, newPhoto];
        photoStore.set(updated);
        return updated;
      });
    };
    reader.readAsDataURL(file);
  }

  const sizeResult = recommendSize(profile);
  const frontPhoto = photos.find((p) => p.type === "front");
  const hasFront = !!frontPhoto;

  const inputClass =
    "w-full px-3 py-2 rounded-xl text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none focus:ring-2 focus:ring-[#F97316]/50 transition-all duration-200";
  const inputStyle = {
    background: "rgba(15,17,23,0.8)",
    border: "1px solid rgba(249,115,22,0.2)",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            MY PROFILE
          </h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">Measurements & body photos</p>
        </div>
        {!editing && (
          <button
            onClick={startEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#F97316] cursor-pointer transition-all duration-200 hover:bg-[#F97316]/10"
            style={{ border: "1px solid rgba(249,115,22,0.35)" }}
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
            Edit
          </button>
        )}
      </div>

      {/* No front photo warning */}
      {!hasFront && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
          role="alert"
        >
          <AlertTriangle className="w-5 h-5 text-[#EF4444] flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-[#EF4444]">
            Upload a front photo to enable Try On
          </p>
        </div>
      )}

      {/* Saved toast */}
      {saved && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
          role="status"
        >
          <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-[#22C55E]">Profile saved successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Measurements card */}
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(16px)" }}
        >
          <h3
            className="text-lg font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            MEASUREMENTS
          </h3>

          {editing ? (
            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="p-name">Name</label>
                <input
                  id="p-name"
                  type="text"
                  className={inputClass}
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="p-gender">Gender</label>
                <div className="relative">
                  <select
                    id="p-gender"
                    className={`${inputClass} appearance-none pr-8`}
                    style={inputStyle}
                    value={form.gender}
                    onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value as Measurements["gender"] }))}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-[#94A3B8] pointer-events-none" aria-hidden="true" />
                </div>
              </div>
              {/* Numeric fields */}
              {(
                [
                  { key: "height", label: "Height (cm)", placeholder: "e.g. 175" },
                  { key: "chest",  label: "Chest (cm)",  placeholder: "e.g. 95"  },
                  { key: "waist",  label: "Waist (cm)",  placeholder: "e.g. 80"  },
                  { key: "hips",   label: "Hips (cm)",   placeholder: "e.g. 100" },
                  { key: "arm",    label: "Arm length (cm)", placeholder: "e.g. 60" },
                  { key: "inseam", label: "Inseam (cm)", placeholder: "e.g. 80"  },
                ] as { key: keyof Measurements; label: string; placeholder: string }[]
              ).map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-[#94A3B8] mb-1" htmlFor={`p-${key}`}>{label}</label>
                  <input
                    id={`p-${key}`}
                    type="number"
                    className={inputClass}
                    style={inputStyle}
                    value={form[key] ?? ""}
                    onChange={(e) => numField(key, e.target.value)}
                    placeholder={placeholder}
                    min={0}
                  />
                </div>
              ))}
              {/* Preferred size */}
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="p-psize">Preferred Size</label>
                <div className="relative">
                  <select
                    id="p-psize"
                    className={`${inputClass} appearance-none pr-8`}
                    style={inputStyle}
                    value={form.preferredSize}
                    onChange={(e) => setForm((prev) => ({ ...prev, preferredSize: e.target.value as Size | "" }))}
                  >
                    <option value="">Not specified</option>
                    {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-[#94A3B8] pointer-events-none" aria-hidden="true" />
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveProfile}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
                  style={{ background: "#F97316", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
                >
                  <Save className="w-4 h-4" aria-hidden="true" />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#94A3B8] cursor-pointer transition-all duration-200 hover:text-[#F8FAFC] hover:bg-white/5"
                  style={{ border: "1px solid rgba(148,163,184,0.2)" }}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {profile.name && (
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Name</span>
                  <span className="text-sm text-[#F8FAFC] font-medium">{profile.name}</span>
                </div>
              )}
              {profile.gender && (
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Gender</span>
                  <span className="text-sm text-[#F8FAFC] font-medium capitalize">{profile.gender}</span>
                </div>
              )}
              {([
                { key: "height", label: "Height" },
                { key: "chest",  label: "Chest"  },
                { key: "waist",  label: "Waist"  },
                { key: "hips",   label: "Hips"   },
                { key: "arm",    label: "Arm length" },
                { key: "inseam", label: "Inseam" },
              ] as { key: keyof Measurements; label: string }[]).map(({ key, label }) =>
                profile[key] ? (
                  <div key={key} className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-sm text-[#94A3B8]">{label}</span>
                    <span className="text-sm text-[#F8FAFC] font-medium">{profile[key] as number} cm</span>
                  </div>
                ) : null
              )}
              {!profile.chest && !profile.waist && !profile.hips && (
                <p className="text-sm text-[#64748B] text-center py-4">
                  No measurements yet. Click Edit to add your measurements.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Size recommendation card */}
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(16px)" }}
        >
          <h3
            className="text-lg font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            SIZE RECOMMENDATION
          </h3>

          {sizeResult ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-5xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {sizeResult.recommended}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">Recommended size</div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: `${confidenceColor(sizeResult.confidence)}20`,
                    color: confidenceColor(sizeResult.confidence),
                    border: `1px solid ${confidenceColor(sizeResult.confidence)}40`,
                  }}
                >
                  {sizeResult.confidence} confidence
                </div>
              </div>

              <p className="text-sm text-[#94A3B8]">{sizeResult.note}</p>

              {/* Breakdown table */}
              <div className="space-y-2">
                <div className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Breakdown</div>
                {sizeResult.breakdown.map((b) => (
                  <div key={b.label} className="flex items-center justify-between py-2 border-t border-white/5">
                    <span className="text-sm text-[#94A3B8]">{b.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#F8FAFC]">{b.value} {b.unit}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${fitColor(b.fit)}20`,
                          color: fitColor(b.fit),
                        }}
                      >
                        {b.size} · {fitLabel(b.fit)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(249,115,22,0.1)" }}
              >
                <ChevronDown className="w-8 h-8 text-[#F97316]/50" aria-hidden="true" />
              </div>
              <p className="text-sm text-[#64748B]">Add measurements to get your size recommendation.</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo upload section */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(16px)" }}
      >
        <h3
          className="text-lg font-bold text-[#F8FAFC] mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          BODY PHOTOS
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {PHOTO_SLOTS.map(({ type, label, badge }) => {
            const photo = photos.find((p) => p.type === type);
            return (
              <div key={type} className="space-y-2">
                <button
                  type="button"
                  onClick={() => fileRefs.current[type]?.click()}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group"
                  style={{
                    background: "rgba(15,17,23,0.8)",
                    border: photo ? "2px solid rgba(249,115,22,0.5)" : "2px dashed rgba(148,163,184,0.2)",
                  }}
                  aria-label={`Upload ${label} photo`}
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.dataUrl}
                      alt={`${label} body photo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Camera className="w-8 h-8 text-[#64748B] group-hover:text-[#94A3B8] transition-colors" aria-hidden="true" />
                      <span className="text-xs text-[#64748B] group-hover:text-[#94A3B8] transition-colors">Upload</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  {photo && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                  )}
                </button>
                <input
                  ref={(el) => { fileRefs.current[type] = el; }}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label={`${label} photo file input`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(type, file);
                  }}
                />
                <div className="text-center">
                  <div className="text-sm font-semibold text-[#F8FAFC]">{label}</div>
                  {badge && (
                    <div
                      className="inline-block text-xs px-2 py-0.5 rounded-full mt-0.5"
                      style={{ background: "rgba(249,115,22,0.15)", color: "#F97316" }}
                    >
                      {badge}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
