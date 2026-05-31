"use client";

import { useState, useEffect } from "react";
import { Wand2, AlertTriangle, CheckCircle, Tag } from "lucide-react";
import { photoStore, historyStore, wardrobeStore } from "@/lib/store";
import type { UserPhoto, TryOnResult, Category } from "@/lib/store";
import { detectCategory, recommendSize } from "@/lib/sizing";
import { profileStore } from "@/lib/store";

function categoryLabel(cat: Category): string {
  if (cat === "lower_body") return "Pants/Skirt";
  if (cat === "dresses") return "Dress/Jumpsuit";
  return "Top/Jacket";
}

function categoryColor(cat: Category): string {
  if (cat === "lower_body") return "#22C55E";
  if (cat === "dresses") return "#A78BFA";
  return "#F97316";
}

interface TryOnTabProps {
  onGoToProfile?: () => void;
}

export default function TryOnTab({ onGoToProfile }: TryOnTabProps) {
  const [frontPhoto, setFrontPhoto] = useState<UserPhoto | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemImageUrl, setItemImageUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<TryOnResult | null>(null);

  useEffect(() => {
    setFrontPhoto(photoStore.getFront());
  }, []);

  const detectedCategory = detectCategory(itemName);
  const profile = typeof window !== "undefined" ? profileStore.get() : null;
  const sizeResult = profile ? recommendSize(profile) : null;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleGenerate() {
    if (!frontPhoto) return;
    if (!itemName.trim()) {
      showToast("Please enter an item name.");
      return;
    }
    setGenerating(true);

    setTimeout(() => {
      const result: TryOnResult = {
        id: `tryon_${Date.now()}`,
        itemId: `item_${Date.now()}`,
        itemName: itemName.trim(),
        itemBrand: itemBrand.trim(),
        itemImageUrl: itemImageUrl.trim() || "",
        resultImageUrl: itemImageUrl.trim() || "",
        sizeRecommended: sizeResult?.recommended ?? "M",
        category: detectedCategory,
        createdAt: new Date().toISOString(),
      };

      const prev = historyStore.get();
      historyStore.set([result, ...prev]);

      // Also add to wardrobe if not already there
      const wardrobe = wardrobeStore.get();
      const alreadyInWardrobe = wardrobe.some(
        (w) => w.name === result.itemName && w.brand === result.itemBrand
      );
      if (!alreadyInWardrobe && itemName.trim()) {
        wardrobeStore.set([
          ...wardrobe,
          {
            id: `wi_${Date.now()}`,
            name: result.itemName,
            brand: result.itemBrand,
            imageUrl: result.itemImageUrl,
            category: result.category,
            addedAt: result.createdAt,
          },
        ]);
      }

      setLastResult(result);
      setGenerating(false);
      showToast("Try-on complete! Saved to History.");
    }, 1200);
  }

  const inputClass =
    "w-full px-3 py-2 rounded-xl text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none focus:ring-2 focus:ring-[#F97316]/50 transition-all duration-200";
  const inputStyle = {
    background: "rgba(15,17,23,0.8)",
    border: "1px solid rgba(249,115,22,0.2)",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-3xl font-bold text-[#F8FAFC]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          VIRTUAL TRY-ON
        </h2>
        <p className="text-sm text-[#94A3B8] mt-0.5">See how clothes look on you</p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
          role="status"
        >
          <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-[#22C55E]">{toast}</p>
        </div>
      )}

      {/* No front photo error */}
      {!frontPhoto && (
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}
          role="alert"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[#EF4444] flex-shrink-0" aria-hidden="true" />
            <div>
              <div className="text-[#EF4444] font-semibold">No front photo found</div>
              <div className="text-sm text-[#94A3B8] mt-0.5">
                Please upload a full-body front photo in the Profile tab first.
              </div>
            </div>
          </div>
          {onGoToProfile && (
            <button
              onClick={onGoToProfile}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
              style={{ background: "#F97316", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
            >
              Go to Profile →
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(16px)" }}
        >
          <h3
            className="text-lg font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            GARMENT DETAILS
          </h3>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="try-name">Item name</label>
            <input
              id="try-name"
              type="text"
              className={inputClass}
              style={inputStyle}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Classic Denim Jacket"
            />
            {/* Live category badge */}
            {itemName && (
              <div className="flex items-center gap-2 mt-2">
                <Tag className="w-3.5 h-3.5" style={{ color: categoryColor(detectedCategory) }} aria-hidden="true" />
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${categoryColor(detectedCategory)}20`,
                    color: categoryColor(detectedCategory),
                  }}
                >
                  {detectedCategory} → {categoryLabel(detectedCategory)}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="try-brand">Brand</label>
            <input
              id="try-brand"
              type="text"
              className={inputClass}
              style={inputStyle}
              value={itemBrand}
              onChange={(e) => setItemBrand(e.target.value)}
              placeholder="e.g. Levi's"
            />
          </div>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="try-url">Item image URL</label>
            <input
              id="try-url"
              type="url"
              className={inputClass}
              style={inputStyle}
              value={itemImageUrl}
              onChange={(e) => setItemImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Size recommendation preview */}
          {sizeResult && (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <span className="text-sm text-[#94A3B8]">Your recommended size</span>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ background: "#F97316", color: "white" }}
              >
                {sizeResult.recommended}
              </span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!frontPhoto || generating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={
              frontPhoto && !generating
                ? { background: "#F97316", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }
                : { background: "rgba(249,115,22,0.4)" }
            }
          >
            <Wand2 className="w-4 h-4" aria-hidden="true" />
            {generating ? "Generating…" : "Generate Try-On"}
          </button>
        </div>

        {/* Preview / result */}
        <div className="space-y-4">
          {/* Front photo preview */}
          {frontPhoto && (
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)", backdropFilter: "blur(16px)" }}
            >
              <div className="text-sm font-semibold text-[#94A3B8]">Your photo (front)</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frontPhoto.dataUrl}
                alt="Your front body photo"
                className="w-full max-h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Try-on result */}
          {lastResult && (
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(34,197,94,0.2)", backdropFilter: "blur(16px)" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[#22C55E]">Try-On Result</div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${categoryColor(lastResult.category)}20`,
                    color: categoryColor(lastResult.category),
                  }}
                >
                  {categoryLabel(lastResult.category)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {lastResult.itemImageUrl ? (
                  <div className="space-y-1">
                    <div className="text-xs text-[#64748B]">Item</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={lastResult.itemImageUrl}
                      alt={lastResult.itemName}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-square rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px dashed rgba(249,115,22,0.3)" }}
                  >
                    <span className="text-xs text-[#64748B] text-center px-2">{lastResult.itemName}</span>
                  </div>
                )}
                <div
                  className="aspect-square rounded-xl flex flex-col items-center justify-center gap-2"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <CheckCircle className="w-8 h-8 text-[#22C55E]" aria-hidden="true" />
                  <div className="text-center">
                    <div className="text-xs text-[#64748B]">Size</div>
                    <div className="text-lg font-bold text-[#F8FAFC]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {lastResult.sizeRecommended}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#F8FAFC]">{lastResult.itemName}</div>
                {lastResult.itemBrand && (
                  <div className="text-xs text-[#94A3B8]">{lastResult.itemBrand}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
