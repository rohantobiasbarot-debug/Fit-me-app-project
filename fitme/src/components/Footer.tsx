import { Zap } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Roadmap", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Community", "Contact", "Status"],
  Legal: ["Privacy", "Terms", "Cookies", "GDPR"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true" />
              </div>
              <span
                className="text-xl font-bold gradient-text"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                FIT-ME
              </span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
              Train smarter, live better. AI-powered fitness for everyone.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[#F8FAFC] font-semibold text-sm mb-4">{category}</h4>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#64748B] hover:text-[#94A3B8] transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-sm">
            © 2026 Fit-me. All rights reserved.
          </p>
          <p className="text-[#475569] text-sm">
            Built with dedication for athletes everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
