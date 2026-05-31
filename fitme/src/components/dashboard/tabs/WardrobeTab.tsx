"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Shirt, Tag } from "lucide-react";
import { wardrobeStore } from "@/lib/store";
import type { WardrobeItem, Category } from "@/lib/store";
import { detectCategory } from "@/lib/sizing";

type FilterType = "all" | Category;

function categoryLabel(cat: Category): string {
  if (cat === "lower_body") return "Bottoms";
  if (cat === "dresses") return "Dresses";
  return "Tops";
}

function categoryColor(cat: Category): string {
  if (cat === "lower_body") return "#22C55E";
  if (cat === "dresses") return "#A78BFA";
  return "#F97316";
}

export default function WardrobeTab() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", imageUrl: "", price: "", url: "" });

  useEffect(() => {
    setItems(wardrobeStore.get());
  }, []);

  const detectedCategory = detectCategory(form.name);

  function handleAdd() {
    if (!form.name.trim()) return;
    const item: WardrobeItem = {
      id: `wi_${Date.now()}`,
      name: form.name.trim(),
      brand: form.brand.trim(),
      imageUrl: form.imageUrl.trim(),
      category: detectedCategory,
      price: form.price.trim() || undefined,
      url: form.url.trim() || undefined,
      addedAt: new Date().toISOString(),
    };
    const updated = [...items, item];
    wardrobeStore.set(updated);
    setItems(updated);
    setForm({ name: "", brand: "", imageUrl: "", price: "", url: "" });
    setShowForm(false);
  }

  function handleDelete(id: string) {
    const updated = items.filter((i) => i.id !== id);
    wardrobeStore.set(updated);
    setItems(updated);
  }

  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);

  const inputClass =
    "w-full px-3 py-2 rounded-xl text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none focus:ring-2 focus:ring-[#F97316]/50 transition-all duration-200";
  const inputStyle = {
    background: "rgba(15,17,23,0.8)",
    border: "1px solid rgba(249,115,22,0.2)",
  };

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "upper_body", label: "Tops" },
    { id: "lower_body", label: "Bottoms" },
    { id: "dresses", label: "Dresses" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            MY WARDROBE
          </h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
          style={{ background: "#F97316", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Item
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.2)", backdropFilter: "blur(16px)" }}
        >
          <h3
            className="text-lg font-bold text-[#F8FAFC]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ADD NEW ITEM
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="w-name">Item name *</label>
              <input
                id="w-name"
                type="text"
                className={inputClass}
                style={inputStyle}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Slim Fit Chinos"
              />
              {form.name && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Tag className="w-3 h-3" style={{ color: categoryColor(detectedCategory) }} aria-hidden="true" />
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: `${categoryColor(detectedCategory)}20`, color: categoryColor(detectedCategory) }}
                  >
                    {categoryLabel(detectedCategory)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="w-brand">Brand</label>
              <input
                id="w-brand"
                type="text"
                className={inputClass}
                style={inputStyle}
                value={form.brand}
                onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                placeholder="e.g. Zara"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="w-img">Image URL</label>
              <input
                id="w-img"
                type="url"
                className={inputClass}
                style={inputStyle}
                value={form.imageUrl}
                onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="w-price">Price (optional)</label>
              <input
                id="w-price"
                type="text"
                className={inputClass}
                style={inputStyle}
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="e.g. $49.99"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[#94A3B8] mb-1" htmlFor="w-url">Product URL (optional)</label>
              <input
                id="w-url"
                type="url"
                className={inputClass}
                style={inputStyle}
                value={form.url}
                onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "#F97316" }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#94A3B8] cursor-pointer transition-all duration-200 hover:text-[#F8FAFC] hover:bg-white/5"
              style={{ border: "1px solid rgba(148,163,184,0.2)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category filter pills */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
            style={
              filter === id
                ? { background: "#F97316", color: "white" }
                : {
                    background: "rgba(26,31,46,0.7)",
                    color: "#94A3B8",
                    border: "1px solid rgba(249,115,22,0.15)",
                  }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
            style={{ background: "rgba(249,115,22,0.1)" }}
          >
            <Shirt className="w-8 h-8 text-[#F97316]/50" aria-hidden="true" />
          </div>
          <p className="text-[#64748B]">
            {filter === "all"
              ? "Your wardrobe is empty. Add your first item."
              : `No ${filters.find((f) => f.id === filter)?.label.toLowerCase()} yet.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden group"
              style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.12)", backdropFilter: "blur(16px)" }}
            >
              {/* Image */}
              <div className="relative aspect-square">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "rgba(15,17,23,0.8)" }}
                  >
                    <Shirt className="w-10 h-10 text-[#64748B]" aria-hidden="true" />
                  </div>
                )}
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ background: "rgba(239,68,68,0.9)" }}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </button>
                {/* Category badge */}
                <div
                  className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${categoryColor(item.category)}90`,
                    color: "white",
                  }}
                >
                  {categoryLabel(item.category)}
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <div className="text-sm font-semibold text-[#F8FAFC] truncate">{item.name}</div>
                <div className="text-xs text-[#94A3B8] truncate">{item.brand || "Unknown brand"}</div>
                {item.price && (
                  <div className="text-xs text-[#F97316] font-semibold mt-1">{item.price}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
