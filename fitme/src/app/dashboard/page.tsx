import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import LineChart from "@/components/charts/LineChart";
import {
  Flame,
  Activity,
  TrendingUp,
  Calendar,
  Dumbbell,
  Timer,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — Fit-me",
  description: "Track your workouts, progress, and goals.",
};

const stats = [
  { icon: Flame, label: "Calories Burned", value: "2,847", change: "+12%", accent: "#F97316" },
  { icon: Activity, label: "Active Minutes", value: "94", change: "+8%", accent: "#22C55E" },
  { icon: TrendingUp, label: "Weekly Streak", value: "12 days", change: "Best!", accent: "#FB923C" },
  { icon: Calendar, label: "Workouts", value: "48", change: "+4", accent: "#F97316" },
];

const weightData = [82.5, 82.1, 81.6, 81.2, 80.8, 80.1, 79.6, 79.2];
const weightLabels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

const volumeData = [4200, 4800, 4500, 5200, 5600, 5400, 6100];
const volumeLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const recentWorkouts = [
  { name: "Upper Body Strength", date: "Today, 7:30 AM", duration: "52 min", calories: 410, type: "Strength" },
  { name: "HIIT Cardio Blast", date: "Yesterday, 6:00 PM", duration: "28 min", calories: 380, type: "Cardio" },
  { name: "Leg Day", date: "2 days ago", duration: "61 min", calories: 520, type: "Strength" },
  { name: "Morning Yoga Flow", date: "3 days ago", duration: "35 min", calories: 145, type: "Mobility" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0F1117" }}>
      <Sidebar />

      <main className="flex-1 p-5 md:p-8 pt-20 md:pt-8 max-w-full overflow-x-hidden">
        {/* Header */}
        <header className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WELCOME BACK, <span className="gradient-text">ROHAN</span>
          </h1>
          <p className="text-[#94A3B8]">
            You&apos;re on a 12-day streak. Keep the momentum going!
          </p>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${stat.accent}20`, color: stat.accent }}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#22C55E] font-semibold">
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    {stat.change}
                  </span>
                </div>
                <div
                  className="text-3xl font-bold text-[#F8FAFC]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#94A3B8]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#F8FAFC]">Weight Trend</h2>
                <p className="text-sm text-[#94A3B8]">Last 8 weeks</p>
              </div>
              <span className="text-sm text-[#22C55E] font-semibold">-2.9 kg</span>
            </div>
            <LineChart
              data={weightData}
              labels={weightLabels}
              color="#22C55E"
              unit=" kg"
              ariaLabel="Body weight trend over the last 8 weeks, decreasing from 82.5 to 79.2 kg"
            />
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#F8FAFC]">Training Volume</h2>
                <p className="text-sm text-[#94A3B8]">This week (kg lifted)</p>
              </div>
              <span className="text-sm text-[#F97316] font-semibold">+18%</span>
            </div>
            <LineChart
              data={volumeData}
              labels={volumeLabels}
              color="#F97316"
              unit=" kg"
              ariaLabel="Daily training volume this week, ranging from 4200 to 6100 kg lifted"
            />
          </div>
        </div>

        {/* Recent workouts table */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#F8FAFC]">Recent Workouts</h2>
            <button className="text-sm text-[#F97316] hover:text-[#FB923C] transition-colors duration-200 cursor-pointer font-medium">
              View all
            </button>
          </div>

          {/* Scroll wrapper to avoid wide-table layout break */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="text-left text-xs text-[#64748B] uppercase tracking-wider">
                  <th scope="col" className="pb-3 font-semibold">Workout</th>
                  <th scope="col" className="pb-3 font-semibold">Type</th>
                  <th scope="col" className="pb-3 font-semibold">Duration</th>
                  <th scope="col" className="pb-3 font-semibold">Calories</th>
                  <th scope="col" className="pb-3 font-semibold">When</th>
                </tr>
              </thead>
              <tbody>
                {recentWorkouts.map((w) => (
                  <tr
                    key={w.name}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-[#F97316]/15 flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          {w.type === "Cardio" ? (
                            <Timer className="w-4 h-4 text-[#F97316]" />
                          ) : (
                            <Dumbbell className="w-4 h-4 text-[#F97316]" />
                          )}
                        </div>
                        <span className="text-sm text-[#F8FAFC] font-medium whitespace-nowrap">
                          {w.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] font-medium whitespace-nowrap">
                        {w.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#94A3B8] whitespace-nowrap">{w.duration}</td>
                    <td className="py-4 text-sm text-[#94A3B8] whitespace-nowrap">{w.calories} kcal</td>
                    <td className="py-4 text-sm text-[#64748B] whitespace-nowrap">{w.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
