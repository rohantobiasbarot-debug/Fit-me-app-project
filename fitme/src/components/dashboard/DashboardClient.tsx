"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TabBar from "@/components/dashboard/TabBar";
import TryOnTab from "@/components/dashboard/tabs/TryOnTab";
import WardrobeTab from "@/components/dashboard/tabs/WardrobeTab";
import HistoryTab from "@/components/dashboard/tabs/HistoryTab";
import ProfileTab from "@/components/dashboard/tabs/ProfileTab";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("tryon");

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0F1117" }}>
      <Sidebar activeTab={activeTab} />

      <main className="flex-1 p-5 md:p-8 pt-20 md:pt-8 max-w-full overflow-x-hidden">
        {/* Header */}
        <header className="mb-6">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            DASHBOARD
          </h1>
          <p className="text-[#94A3B8]">Your personal fitting room</p>
        </header>

        <TabBar activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-2">
          {activeTab === "tryon" && (
            <TryOnTab onGoToProfile={() => setActiveTab("profile")} />
          )}
          {activeTab === "wardrobe" && <WardrobeTab />}
          {activeTab === "history" && <HistoryTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </main>
    </div>
  );
}
