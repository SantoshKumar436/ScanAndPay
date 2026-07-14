import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import InteractiveShowcase from "./components/InteractiveShowcase";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { Sparkles, Heart, Bell } from "lucide-react";
import { Contact } from "./types";
import { initialContacts } from "./data";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  // IntersectionObserver for scroll-triggered slide reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-element");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Scroll Helpers
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Ambient Background Sparkles & Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/2 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#3B82F6]/2 blur-[160px] rounded-full pointer-events-none"></div>

      {/* Sticky frosted glass navbar */}
      <Navbar 
        onScrollToSimulate={() => scrollToId("simulator")}
        onScrollToFaqs={() => scrollToId("faq")}
        onScrollToFeatures={() => scrollToId("how-it-works")}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* Hero Section with synced contacts */}
        <Hero onScrollToSimulate={() => scrollToId("simulator")} contacts={contacts} />

        {/* Counter Stats Band */}
        <Stats />

        {/* Visual presentation & Step process */}
        <div className="reveal-element">
          <Features />
        </div>

        {/* Live Simulator & Custom Contact Setup Panel with shared state */}
        <div className="reveal-element">
          <InteractiveShowcase 
            contacts={contacts} 
            setContacts={setContacts} 
          />
        </div>

        {/* Heartwarming trust alert block */}
        <section className="py-12 bg-white/5 border-t border-b border-white/5 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] shrink-0">
                <Bell className="w-6 h-6 animate-swing" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white font-display">Enable Smart WhatsApp Confirmations</h4>
                <p className="text-gray-400 text-xs mt-0.5 max-w-lg">
                  Whenever a transaction completes, QRPass pushes a certified secure "Paid Successfully" message directly to your parents, keeping them stress-free.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-black text-[#F5A623] border border-[#F5A623]/20 bg-[#F5A623]/5 px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0">
              ⚡ Verified Merchant Safe
            </span>
          </div>
        </section>

        {/* FAQ & Support Section */}
        <div className="reveal-element">
          <FAQ />
        </div>

      </main>

      {/* Polish Dark Footer */}
      <Footer />
    </div>
  );
}
