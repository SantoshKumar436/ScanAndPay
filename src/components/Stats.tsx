import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Stats() {
  const [activeFamilies, setActiveFamilies] = useState(11200);
  const [remotelyPaid, setRemotelyPaid] = useState(38.4);
  const [shareSpeed, setShareSpeed] = useState(0.9);

  useEffect(() => {
    // Families count up
    const familiesTimer = setInterval(() => {
      setActiveFamilies((prev) => {
        if (prev >= 12400) {
          clearInterval(familiesTimer);
          return 12400;
        }
        return prev + 100;
      });
    }, 20);

    // Paid amount count up
    const paidTimer = setInterval(() => {
      setRemotelyPaid((prev) => {
        if (prev >= 42.8) {
          clearInterval(paidTimer);
          return 42.8;
        }
        return parseFloat((prev + 0.4).toFixed(1));
      });
    }, 20);

    // Share speed ticks down
    const speedTimer = setInterval(() => {
      setShareSpeed((prev) => {
        if (prev <= 0.2) {
          clearInterval(speedTimer);
          return 0.2;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 150);

    return () => {
      clearInterval(familiesTimer);
      clearInterval(paidTimer);
      clearInterval(speedTimer);
    };
  }, []);

  return (
    <div className="w-full bg-[#F5A623] text-[#080C14] shrink-0 py-10 px-6 sm:px-8 shadow-inner relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-left">
        {/* Stat 1 */}
        <div className="flex flex-col border-r border-[#080C14]/10 pr-4">
          <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#080C14]">
            {activeFamilies.toLocaleString()}+
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#080C14]/75 mt-1">
            Active Families
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col border-r-0 md:border-r border-[#080C14]/10 pr-4 pl-0 md:pl-8">
          <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#080C14]">
            ₹{remotelyPaid} Cr
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#080C14]/75 mt-1">
            Remotely Paid
          </span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col border-r border-[#080C14]/10 pr-4 pl-0 md:pl-8">
          <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#080C14]">
            {shareSpeed}s
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#080C14]/75 mt-1">
            Avg Share Speed
          </span>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col pl-0 md:pl-8 justify-center">
          <div className="flex gap-0.5 text-[#080C14] mb-1">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#080C14]">
            4.9 Rated on Play Store
          </span>
        </div>
      </div>
    </div>
  );
}
