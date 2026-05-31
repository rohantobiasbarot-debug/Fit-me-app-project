import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard — Fit-me",
  description: "Your virtual fitting room. Try on clothes, manage your wardrobe, and get size recommendations.",
};

export default function Dashboard() {
  return <DashboardClient />;
}
