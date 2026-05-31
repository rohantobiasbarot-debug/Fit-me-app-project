import { ArrowRight, Play, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 px-4">
      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22C55E, transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" aria-hidden="true" />
          <span className="text-sm text-[#94A3B8]">
            <span className="text-[#22C55E] font-semibold">New</span> — AI-powered workout plans are here
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 tracking-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          TRAIN{" "}
          <span className="gradient-text">SMARTER</span>
          <br />
          LIVE <span className="text-[#22C55E]">BETTER</span>
        </h1>

        <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
          Your AI-powered fitness companion that adapts to your body, schedule, and goals.
          500,000+ athletes already crushing their targets.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#download"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-lg transition-all duration-200 glow-orange cursor-pointer"
          >
            Start for Free
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </a>
          <a
            href="#demo"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-[#F8FAFC] font-semibold text-lg transition-all duration-200 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center"
              aria-hidden="true"
            >
              <Play className="w-4 h-4 text-[#F97316]" fill="currentColor" />
            </div>
            Watch Demo
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-1" aria-label="4.9 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-[#FBBF24]"
                fill="currentColor"
                aria-hidden="true"
              />
            ))}
            <span className="ml-2 text-[#F8FAFC] font-semibold">4.9</span>
          </div>
          <span className="text-[#94A3B8] text-sm hidden sm:block" aria-hidden="true">·</span>
          <span className="text-[#94A3B8] text-sm">
            <span className="text-[#F8FAFC] font-semibold">500,000+</span> active athletes
          </span>
          <span className="text-[#94A3B8] text-sm hidden sm:block" aria-hidden="true">·</span>
          <span className="text-[#94A3B8] text-sm">
            Available on <span className="text-[#F8FAFC] font-semibold">iOS & Android</span>
          </span>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
          {[
            { value: "500K+", label: "Active Users" },
            { value: "12M+", label: "Workouts Logged" },
            { value: "98%", label: "Goal Achievement" },
            { value: "4.9★", label: "App Store Rating" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <div
                className="text-3xl font-bold gradient-text mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
