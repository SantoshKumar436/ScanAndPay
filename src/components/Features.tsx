import React from "react";
import { features } from "../data";
import { Camera, Maximize, ShieldCheck, Globe, Users, Sparkles, Phone, CheckCircle, ArrowRight } from "lucide-react";

// Helper to map string names to Lucide icons
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Camera: Camera,
  Maximize: Maximize,
  ShieldCheck: ShieldCheck,
  Globe: Globe,
  Users: Users,
  Sparkles: Sparkles,
};

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-8 relative bg-[#09101D]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-element">
          <span className="text-[#3B82F6] text-xs font-black uppercase tracking-widest bg-[#3B82F6]/10 px-3.5 py-1.5 rounded-full border border-[#3B82F6]/10">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight mt-6 mb-4">
            Four simple steps. <br />
            No tech struggles for them.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            We designed QRPass to work directly from the device's native photo gallery. Your parents don't need to open any banking applications or configure complicated settings.
          </p>
        </div>

        {/* 4 Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 relative">
          
          {/* Animated path helper line */}
          <div className="hidden md:block absolute top-16 left-1/8 right-1/8 h-[2px] bg-gradient-to-r from-[#F5A623]/20 via-[#3B82F6]/20 to-emerald-500/20 z-0"></div>

          {/* Step 1 */}
          <div className="bg-[#080C14] border border-white/5 hover:border-[#F5A623]/20 rounded-2xl p-6 relative z-10 transition-all flex flex-col items-start shadow-xl group">
            <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-xl flex items-center justify-center font-bold font-display text-base mb-6 group-hover:scale-105 transition-all">
              01
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Snap the QR</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              When at any shop, store, or medical counter in India, parents simply photograph the merchant's printed UPI QR code using their normal camera app.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#080C14] border border-white/5 hover:border-[#3B82F6]/20 rounded-2xl p-6 relative z-10 transition-all flex flex-col items-start shadow-xl group">
            <div className="w-12 h-12 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl flex items-center justify-center font-bold font-display text-base mb-6 group-hover:scale-105 transition-all">
              02
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Long-Press Gallery</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              They open their photo gallery, hold down on the QR photo, and hit the share button. There are no secondary apps for them to open first.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#080C14] border border-white/5 hover:border-[#F5A623]/20 rounded-2xl p-6 relative z-10 transition-all flex flex-col items-start shadow-xl group">
            <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-xl flex items-center justify-center font-bold font-display text-base mb-6 group-hover:scale-105 transition-all">
              03
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Select Your Name</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              From the native share sheet, they select QRPass. A quick menu populates with pre-saved family member names. They tap your name.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#080C14] border border-[#10B981]/20 hover:border-[#10B981]/40 rounded-2xl p-6 relative z-10 transition-all flex flex-col items-start shadow-xl group">
            <div className="w-12 h-12 bg-[#10B981]/10 text-[#10B981] rounded-xl flex items-center justify-center font-bold font-display text-base mb-6 group-hover:scale-105 transition-all">
              04
            </div>
            <h3 className="text-lg font-bold font-display text-[#10B981] mb-2">You Pay on WhatsApp</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              QRPass forwards the QR request straight to your WhatsApp. You tap 'Scan & Pay', opening your favorite UPI app (GPay, PhonePe) to safely pay.
            </p>
          </div>
        </div>

        {/* Bento Grid: Core App Benefits */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            Security. Simplicity. Confidence.
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            Why QRPass is the ultimate system for multigenerational families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = IconMap[feature.iconName] || ShieldCheck;
            return (
              <div 
                key={idx} 
                className="bg-[#080C14] border border-white/5 hover:border-white/10 rounded-3xl p-8 transition-all hover:-translate-y-1 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#F5A623] mb-6">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
