"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";
import { historyStore } from "@/lib/store";
import type { TryOnResult, Category } from "@/lib/store";

function categoryLabel(cat: Category): string {
  if (cat === "lower_body") return "Bottoms";
  if (cat === "dresses") return "Dress";
  return "Top";
}

function categoryColor(cat: Category): string {
  if (cat === "lower_body") return "#22C55E";
  if (cat === "dresses") return "#A78BFA";
  return "#F97316";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function HistoryTab() {
  const [results, setResults] = useState<TryOnResult[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setResults(historyStore.get());
  }, []);

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    historyStore.set([]);
    setResults([]);
    setConfirmClear(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            TRY-ON HISTORY
          </h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">{results.length} try-on{results.length !== 1 ? "s" : ""}</p>
        </div>
        {results.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
            style={
              confirmClear
                ? { background: "rgba(239,68,68,0.2)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.4)" }
                : { background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }
            }
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            {confirmClear ? "Confirm clear?" : "Clear history"}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
            style={{ background: "rgba(249,115,22,0.1)" }}
          >
            <Clock className="w-8 h-8 text-[#F97316]/50" aria-hidden="true" />
          </div>
          <p className="text-[#64748B]">
            No try-ons yet. Head to the Try On tab to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.12)", backdropFilter: "blur(16px)" }}
            >
              {/* Item image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                {r.itemImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.itemImageUrl}
                    alt={r.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                  >
                    <Clock className="w-6 h-6 text-[#F97316]/40" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#F8FAFC] truncate">{r.itemName}</div>
                {r.itemBrand && (
                  <div className="text-xs text-[#94A3B8] truncate">{r.itemBrand}</div>
                )}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${categoryColor(r.category)}20`,
                      color: categoryColor(r.category),
                    }}
                  >
                    {categoryLabel(r.category)}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(249,115,22,0.2)", color: "#F97316" }}
                  >
                    Size {r.sizeRecommended}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs text-[#64748B] text-right flex-shrink-0">
                {formatDate(r.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
