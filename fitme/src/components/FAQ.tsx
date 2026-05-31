"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Fit-me really free?",
    a: "Yes! The Free plan is free forever — no credit card required. You get 3 AI workout plans per month, basic progress tracking, 100+ exercises with video, and community access. Upgrade to Pro anytime for unlimited plans and advanced features.",
  },
  {
    q: "How does the AI build my workout plan?",
    a: "When you sign up, you tell us your fitness level, goals, available equipment, and schedule. Our algorithm analyzes this along with your recovery data and progressively adjusts your program every week based on your performance and feedback.",
  },
  {
    q: "Do I need any equipment?",
    a: "Not at all. Fit-me works whether you train at a fully-equipped gym, at home with dumbbells, or with just your bodyweight. The AI tailors every exercise to the equipment you have available.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. There are no contracts or hidden fees. You can cancel your Pro or Team subscription at any time, and you'll keep access until the end of your billing period — then you automatically move to the Free plan.",
  },
  {
    q: "Is my health data private and secure?",
    a: "Your privacy is our priority. All health data is encrypted in transit and at rest, never sold to third parties, and you can export or delete your data at any time. We're fully GDPR compliant.",
  },
  {
    q: "Which devices and platforms are supported?",
    a: "Fit-me is available on iOS and Android, and syncs seamlessly across all your devices. We also integrate with Apple Health, Google Fit, and popular wearables like Garmin and Fitbit.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-[#22C55E] font-semibold uppercase tracking-widest">
              FAQ
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            QUESTIONS?{" "}
            <span className="gradient-text">ANSWERED</span>
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[#F8FAFC] font-semibold text-base md:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F97316] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[#94A3B8] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
