import { Activity, Calendar, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Showcase() {
  return (
    <section id="demo" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#FB923C] font-semibold uppercase tracking-widest">
              See It In Action
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            YOUR DASHBOARD,{" "}
            <span className="gradient-text">REIMAGINED</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            A beautiful, data-rich command center for your entire fitness journey.
          </p>
        </div>

        {/* Mock app window */}
        <div className="glass-strong rounded-3xl p-3 md:p-4 glow-orange">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-[#F97316]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#FBBF24]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#22C55E]" aria-hidden="true" />
            <span className="ml-3 text-xs text-[#64748B]">fit-me.app/dashboard</span>
          </div>

          {/* Mock content */}
          <div className="rounded-2xl bg-[#0F1117] p-5 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Flame, label: "Calories Burned", value: "2,847", accent: "#F97316" },
                { icon: Activity, label: "Active Minutes", value: "94", accent: "#22C55E" },
                { icon: TrendingUp, label: "Weekly Streak", value: "12", accent: "#FB923C" },
                { icon: Calendar, label: "Workouts", value: "48", accent: "#F97316" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-xl p-4">
                    <Icon
                      className="w-5 h-5 mb-2"
                      style={{ color: stat.accent }}
                      aria-hidden="true"
                    />
                    <div
                      className="text-2xl font-bold text-[#F8FAFC]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#64748B]">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Fake chart bars */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#F8FAFC] font-semibold">Weekly Activity</span>
                <span className="text-xs text-[#22C55E]">+18% vs last week</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-32" aria-hidden="true">
                {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 5
                            ? "linear-gradient(to top, #F97316, #FBBF24)"
                            : "rgba(249,115,22,0.3)",
                      }}
                    />
                    <span className="text-[10px] text-[#64748B]">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl glass hover:bg-white/10 text-[#F8FAFC] font-semibold transition-all duration-200 cursor-pointer"
          >
            Explore the live dashboard
            <TrendingUp className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
