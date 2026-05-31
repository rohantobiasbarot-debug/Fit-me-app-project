import { ClipboardList, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Set Your Goals",
    description:
      "Tell us about yourself — fitness level, goals, available equipment, and schedule. Takes less than 2 minutes.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "AI Builds Your Plan",
    description:
      "Our algorithm generates a fully personalized program — workouts, nutrition, and recovery — optimized for you.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Track & Improve",
    description:
      "Log every session, watch your progress charts grow, and let the AI adjust your plan as you get stronger.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#22C55E] font-semibold uppercase tracking-widest">
              How It Works
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            THREE STEPS TO YOUR{" "}
            <span className="text-[#22C55E]">BEST SELF</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto leading-relaxed">
            Getting started is simple. Your transformation begins the moment you sign up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #F97316, transparent)" }}
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="flex flex-col items-center text-center relative">
                {/* Step number bubble */}
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-2xl glass-strong flex items-center justify-center glow-orange"
                    aria-hidden="true"
                  >
                    <Icon className="w-10 h-10 text-[#F97316]" />
                  </div>
                  <span
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  className="text-2xl font-bold text-[#F8FAFC] mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] leading-relaxed max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
