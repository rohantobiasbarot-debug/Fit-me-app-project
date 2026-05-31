import type { Category, Measurements, Size } from "./store";

export function detectCategory(name = ""): Category {
  const n = name.toLowerCase();
  if (/trouser|pant|jean|skirt|short|legging|chino|jogger|hose|rock/.test(n))
    return "lower_body";
  if (/dress|jumpsuit|overall|romper|gown|kleid/.test(n)) return "dresses";
  return "upper_body";
}

type Threshold = [number, Size];

const CHEST_M: Threshold[] = [[88,"XS"],[93,"S"],[98,"M"],[103,"L"],[108,"XL"],[113,"XXL"],[Infinity,"XXXL"]];
const CHEST_F: Threshold[] = [[80,"XS"],[85,"S"],[90,"M"],[95,"L"],[100,"XL"],[105,"XXL"],[Infinity,"XXXL"]];
const WAIST_M: Threshold[] = [[73,"XS"],[78,"S"],[83,"M"],[88,"L"],[93,"XL"],[98,"XXL"],[Infinity,"XXXL"]];
const WAIST_F: Threshold[] = [[62,"XS"],[67,"S"],[72,"M"],[77,"L"],[82,"XL"],[87,"XXL"],[Infinity,"XXXL"]];
const HIPS_M:  Threshold[] = [[88,"XS"],[93,"S"],[98,"M"],[103,"L"],[108,"XL"],[113,"XXL"],[Infinity,"XXXL"]];
const HIPS_F:  Threshold[] = [[88,"XS"],[93,"S"],[98,"M"],[103,"L"],[108,"XL"],[113,"XXL"],[Infinity,"XXXL"]];
const ARM_THRESHOLDS: Threshold[] = [[57,"XS"],[59,"S"],[61,"M"],[63,"L"],[65,"XL"],[67,"XXL"],[Infinity,"XXXL"]];

const SIZE_ORDER: Size[] = ["XS","S","M","L","XL","XXL","XXXL"];

function lookup(thresholds: Threshold[], value: number): Size {
  for (const [max, size] of thresholds) {
    if (value <= max) return size;
  }
  return "XXXL";
}

function sizeIndex(s: Size) { return SIZE_ORDER.indexOf(s); }

export interface SizeResult {
  recommended: Size;
  confidence: "high" | "medium" | "low";
  breakdown: { label: string; value: number; unit: string; size: Size; fit: "perfect" | "slightly_small" | "slightly_large" }[];
  note: string;
}

export function recommendSize(m: Measurements): SizeResult | null {
  const isFemale = m.gender === "female";
  const votes: Size[] = [];
  const breakdown: SizeResult["breakdown"] = [];

  if (m.chest) {
    const s = lookup(isFemale ? CHEST_F : CHEST_M, m.chest);
    votes.push(s);
    breakdown.push({ label: "Chest", value: m.chest, unit: "cm", size: s, fit: "perfect" });
  }
  if (m.waist) {
    const s = lookup(isFemale ? WAIST_F : WAIST_M, m.waist);
    votes.push(s);
    breakdown.push({ label: "Waist", value: m.waist, unit: "cm", size: s, fit: "perfect" });
  }
  if (m.hips) {
    const s = lookup(isFemale ? HIPS_F : HIPS_M, m.hips);
    votes.push(s);
    breakdown.push({ label: "Hips", value: m.hips, unit: "cm", size: s, fit: "perfect" });
  }
  if (m.arm) {
    const s = lookup(ARM_THRESHOLDS, m.arm);
    votes.push(s);
    breakdown.push({ label: "Arm", value: m.arm, unit: "cm", size: s, fit: "perfect" });
  }

  if (votes.length === 0) return null;

  const avg = votes.reduce((sum, s) => sum + sizeIndex(s), 0) / votes.length;
  const recommended = SIZE_ORDER[Math.round(avg)];

  const recIdx = sizeIndex(recommended);
  for (const b of breakdown) {
    const diff = sizeIndex(b.size) - recIdx;
    b.fit = diff > 0 ? "slightly_small" : diff < 0 ? "slightly_large" : "perfect";
  }

  const spread = Math.max(...votes.map(sizeIndex)) - Math.min(...votes.map(sizeIndex));
  const confidence = spread <= 1 ? "high" : spread <= 2 ? "medium" : "low";

  const note =
    confidence === "high"
      ? "All measurements agree — great fit expected."
      : confidence === "medium"
      ? "Measurements vary slightly. Consider sizing up for comfort."
      : "Measurements vary widely — check brand-specific size chart.";

  return { recommended, confidence, breakdown, note };
}
