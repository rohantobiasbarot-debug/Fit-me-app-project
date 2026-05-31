import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Marathon Runner",
    rating: 5,
    text: "I've tried every fitness app out there. Fit-me is the only one that actually adapts to how I'm feeling each day. Lost 18kg in 6 months.",
    initials: "MT",
    accent: "#F97316",
  },
  {
    name: "Sara L.",
    role: "Busy Mom of 3",
    rating: 5,
    text: "30-minute workouts that actually work. The AI figured out exactly what I needed and I've never been in better shape — even before kids!",
    initials: "SL",
    accent: "#22C55E",
  },
  {
    name: "David K.",
    role: "Powerlifter",
    rating: 5,
    text: "My squat went from 140kg to 185kg in 8 months following the AI program. The progressive overload algorithm is genuinely next-level.",
    initials: "DK",
    accent: "#FB923C",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#FB923C] font-semibold uppercase tracking-widest">
              Reviews
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            REAL PEOPLE,{" "}
            <span className="gradient-text">REAL RESULTS</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            Join 500,000+ athletes who transformed their bodies with Fit-me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <Quote
                className="w-8 h-8 opacity-40"
                style={{ color: t.accent }}
                aria-hidden="true"
              />

              <p className="text-[#CBD5E1] leading-relaxed flex-1">"{t.text}"</p>

              <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#FBBF24]"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.accent }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[#F8FAFC] font-semibold text-sm">{t.name}</div>
                  <div className="text-[#94A3B8] text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
