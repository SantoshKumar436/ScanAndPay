import React from "react";
import { Download, ShieldCheck, Heart } from "lucide-react";

interface NavbarProps {
  onScrollToSimulate: () => void;
  onScrollToFaqs: () => void;
  onScrollToFeatures: () => void;
}

export default function Navbar({ onScrollToSimulate, onScrollToFaqs, onScrollToFeatures }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080C14]/85 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-transform group-hover:scale-105">
            <svg className="w-5 h-5 text-[#080C14]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M12 7v10M7 12h10" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight font-display text-white">
            QR<span className="text-[#F5A623]">Pass</span>
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={onScrollToFeatures} className="hover:text-white hover:underline underline-offset-8 decoration-[#F5A623] decoration-2 transition-all cursor-pointer">
            How it Works
          </button>
          <button onClick={onScrollToSimulate} className="hover:text-white hover:underline underline-offset-8 decoration-[#F5A623] decoration-2 transition-all cursor-pointer">
            Live Simulator
          </button>
          <button onClick={onScrollToFaqs} className="hover:text-white hover:underline underline-offset-8 decoration-[#F5A623] decoration-2 transition-all cursor-pointer">
            Security & FAQ
          </button>
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Heart className="w-3 h-3 fill-current" /> NRI Loved
          </span>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onScrollToSimulate}
            className="hidden sm:inline-flex px-5 py-2.5 border border-white/10 hover:border-white/30 text-white rounded-full text-xs font-bold transition-all"
          >
            Try Demo
          </button>
          <button 
            onClick={() => alert("QRPass is a premium demo app. In a production environment, this triggers Google Play / App Store download.")}
            className="px-6 py-2.5 bg-[#F5A623] text-[#080C14] font-extrabold rounded-full text-xs hover:bg-[#f5a623]/90 active:scale-95 shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            Download Now
          </button>
        </div>
      </div>
    </header>
  );
}
