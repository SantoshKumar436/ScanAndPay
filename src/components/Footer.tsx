import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080C14] border-t border-white/5 py-12 px-6 sm:px-8 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Logo and copyright */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 bg-[#F5A623] rounded flex items-center justify-center">
              <span className="text-[11px] font-black text-[#080C14]">QR</span>
            </div>
            <span className="text-lg font-black font-display text-white">
              QR<span className="text-[#F5A623]">Pass</span>
            </span>
          </div>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            © {new Date().getFullYear()} QRPass Technologies Private Limited. All rights reserved.
          </p>
        </div>

        {/* Middle: Love tag */}
        <p className="text-xs text-gray-400 flex items-center gap-1.5 justify-center">
          Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for families in India & across the globe.
        </p>

        {/* Right: Dummy footer links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs font-semibold text-gray-500">
          <a href="#how-it-works" className="hover:text-[#F5A623] transition-colors">How it Works</a>
          <a href="#simulator" className="hover:text-[#F5A623] transition-colors">Simulator</a>
          <a href="#faq" className="hover:text-[#F5A623] transition-colors">Security Details</a>
          <a href="mailto:support@qrpass.in" className="hover:text-[#F5A623] transition-colors">Contact Support</a>
        </div>

      </div>
    </footer>
  );
}
