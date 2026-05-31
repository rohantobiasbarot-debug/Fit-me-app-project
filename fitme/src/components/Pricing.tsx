import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "3 AI workout plans/month",
      "Basic progress tracking",
      "100+ exercises with video",
      "Community access",
    ],
    cta: "Start Free",
    ctaHref: "#download",
    highlight: false,
  },
  {
    name: "Pro",
    price: "€9",
    period: "per month",
    description: "Everything serious athletes need",
    features: [
      "Unlimited AI workout plans",
      "Advanced analytics dashboard",
      "Nutrition & calorie tracking",
      "Recovery & HRV insights",
      "1,000+ exercises",
      "Priority support",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "#download",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "€25",
    period: "per month",
    description: "For coaches & teams",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Coach dashboard",
      "Custom branded plans",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    ctaHref: "#contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#F97316] font-semibold uppercase tracking-widest">
              Pricing
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            SIMPLE,{" "}
            <span className="gradient-text">HONEST PRICING</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Start free and upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
                plan.highlight ? "glass-strong glow-orange" : "glass"
              }`}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F97316] text-white text-xs font-bold whitespace-nowrap"
                  aria-label="Most popular plan"
                >
                  {plan.badge}
                </div>
              )}

              <div>
                <h3
                  className="text-2xl font-bold text-[#F8FAFC] mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className="text-[#94A3B8] text-sm">{plan.description}</p>
              </div>

              <div>
                <span
                  className="text-5xl font-bold gradient-text"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {plan.price}
                </span>
                <span className="text-[#94A3B8] text-sm ml-2">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                    <Check
                      className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`mt-2 w-full py-3 rounded-xl text-center font-semibold text-sm transition-all duration-200 cursor-pointer block ${
                  plan.highlight
                    ? "bg-[#22C55E] hover:bg-[#16A34A] text-white glow-green"
                    : "glass hover:bg-white/10 text-[#F8FAFC]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
