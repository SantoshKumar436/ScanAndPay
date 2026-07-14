import React, { useState } from "react";
import { faqs } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-6 sm:px-8 bg-[#09101D] relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 reveal-element">
          <span className="text-[#3B82F6] text-xs font-black uppercase tracking-widest bg-[#3B82F6]/10 px-3.5 py-1.5 rounded-full border border-[#3B82F6]/10">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight mt-6 mb-4">
            Security & Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Have questions about set up, transaction limits, or security guardrails? We have answers. Learn how QRPass keeps your parents' transactions perfectly safe.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`bg-[#080C14] border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-[#F5A623] shadow-md shadow-[#F5A623]/5" : "border-white/5"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-[#F5A623]" : "text-[#3B82F6]"}`} />
                    <span className="font-bold text-white text-sm sm:text-base font-display">
                      {faq.question}
                    </span>
                  </div>
                  <span className="shrink-0 text-gray-500">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F5A623]" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated accordion slide body */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-gray-400 leading-relaxed bg-[#0a101c]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NRI CTA */}
        <div className="mt-16 bg-gradient-to-r from-white/5 to-white/0 border border-white/5 rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-extrabold text-white font-display">Are you an NRI child managing parents' upkeep?</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">QRPass handles cross-border time-zones gracefully, routing alerts securely across multiple phone devices.</p>
          </div>
          <button 
            onClick={() => alert("NRI specialist support will be available soon in the QRPass app.")}
            className="shrink-0 px-6 py-3 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            NRI Family Support
          </button>
        </div>

      </div>
    </section>
  );
}
