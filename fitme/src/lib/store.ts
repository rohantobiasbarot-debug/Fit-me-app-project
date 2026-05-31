export type Category = "upper_body" | "lower_body" | "dresses";
export type PhotoType = "front" | "side" | "back";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export interface Measurements {
  height: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  inseam: number | null;
  arm: number | null;
  gender: "male" | "female" | "other" | "";
  preferredSize: Size | "";
  name: string;
}

export interface UserPhoto {
  id: string;
  type: PhotoType;
  dataUrl: string;
  createdAt: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  category: Category;
  price?: string;
  url?: string;
  addedAt: string;
}

export interface TryOnResult {
  id: string;
  itemId: string;
  itemName: string;
  itemBrand: string;
  itemImageUrl: string;
  resultImageUrl: string;
  sizeRecommended: string;
  category: Category;
  createdAt: string;
}

const KEYS = {
  profile: "fitme_profile",
  photos: "fitme_photos",
  wardrobe: "fitme_wardrobe",
  history: "fitme_history",
};

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const defaultProfile: Measurements = {
  height: null, chest: null, waist: null, hips: null,
  inseam: null, arm: null, gender: "", preferredSize: "", name: "",
};

export const profileStore = {
  get: () => load<Measurements>(KEYS.profile, defaultProfile),
  set: (v: Measurements) => save(KEYS.profile, v),
};

export const photoStore = {
  get: () => load<UserPhoto[]>(KEYS.photos, []),
  set: (v: UserPhoto[]) => save(KEYS.photos, v),
  getFront: (): UserPhoto | null => {
    const photos = load<UserPhoto[]>(KEYS.photos, []);
    return (
      photos.find((p) => p.type === "front") ??
      (photos.length ? photos.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] : null)
    );
  },
};

export const wardrobeStore = {
  get: () => load<WardrobeItem[]>(KEYS.wardrobe, []),
  set: (v: WardrobeItem[]) => save(KEYS.wardrobe, v),
};

export const historyStore = {
  get: () => load<TryOnResult[]>(KEYS.history, []),
  set: (v: TryOnResult[]) => save(KEYS.history, v),
};
