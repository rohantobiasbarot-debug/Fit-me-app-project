import { ArrowRight, Smartphone } from "lucide-react";

export default function CTA() {
  return (
    <section id="download" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="glass-strong rounded-3xl p-12 md:p-16 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(26,31,46,0.9) 50%, rgba(34,197,94,0.08) 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #F97316, transparent)" }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #22C55E, transparent)" }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F97316]/20 mb-6 mx-auto">
              <Smartphone className="w-8 h-8 text-[#F97316]" aria-hidden="true" />
            </div>

            <h2
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              READY TO{" "}
              <span className="gradient-text">TRANSFORM</span>
              <br />
              YOUR BODY?
            </h2>
            <p className="text-[#94A3B8] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 500,000+ athletes already using Fit-me. Free forever. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#ios"
                className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-lg transition-all duration-200 glow-orange cursor-pointer w-full sm:w-auto justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#android"
                className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-lg transition-all duration-200 glow-green cursor-pointer w-full sm:w-auto justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.523 15.343 14.26 12.08l3.263-3.263c.36-.36.36-.944 0-1.304l-1.036-1.036c-.36-.36-.944-.36-1.304 0L12 9.74 8.817 6.557c-.36-.36-.944-.36-1.304 0L6.477 7.593c-.36.36-.36.944 0 1.304L9.74 12l-3.263 3.263c-.36.36-.36.944 0 1.304l1.036 1.036c.36.36.944.36 1.304 0L12 14.34l3.183 3.183c.36.36.944.36 1.304 0l1.036-1.036c.36-.36.36-.944 0-1.304zm-4.773-8.96 1.15 2.032H10.1l1.15-2.033c.1-.176.2-.255.275-.255s.175.08.225.256zM5.6 7.96l1.733.997-1.95 1.125A2.005 2.005 0 0 1 5.6 7.96zm0 8.08a2.006 2.006 0 0 1-.217-2.123l1.95 1.126L5.6 16.04zm12.8 0-1.733-.997 1.95-1.126c.14.32.217.67.217 1.037 0 .367-.077.718-.217 1.037l-.217.05zm.217-4.16-1.95-1.125 1.733-.997c.14.32.217.67.217 1.037 0 .366-.077.717-.217 1.036l.217.05z" />
                </svg>
                Google Play
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="mt-6 text-[#64748B] text-sm">
              No credit card required · Free 14-day Pro trial · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
