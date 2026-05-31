import {
  Brain,
  BarChart3,
  Flame,
  Heart,
  Dumbbell,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Workout Plans",
    description:
      "Our AI analyzes your fitness level, goals, and recovery data to build the perfect plan — and adapts it every week.",
    accent: "#F97316",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visual dashboards show your strength gains, cardio improvements, and body composition changes over time.",
    accent: "#22C55E",
  },
  {
    icon: Flame,
    title: "Calorie Intelligence",
    description:
      "Smart nutrition logging with a database of 10M+ foods. Get macro recommendations tailored to your training.",
    accent: "#FB923C",
  },
  {
    icon: Heart,
    title: "Recovery Insights",
    description:
      "Monitor sleep, HRV, and stress levels. Know exactly when to push hard and when to rest and recover.",
    accent: "#F97316",
  },
  {
    icon: Dumbbell,
    title: "1,000+ Exercises",
    description:
      "HD video demonstrations for every exercise. Form tips, modifications, and alternatives for any equipment.",
    accent: "#22C55E",
  },
  {
    icon: Trophy,
    title: "Challenges & Streaks",
    description:
      "Compete with friends, join global challenges, and keep your streak alive with daily fitness goals.",
    accent: "#FB923C",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#F97316] font-semibold uppercase tracking-widest">
              Features
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            EVERYTHING YOU NEED TO{" "}
            <span className="gradient-text">WIN</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            From your first workout to breaking personal records — Fit-me has the tools to take you there.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-200 cursor-default group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${feature.accent}20`, color: feature.accent }}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-xl font-bold text-[#F8FAFC] mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
