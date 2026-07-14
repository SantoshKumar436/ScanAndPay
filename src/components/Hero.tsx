import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Smartphone, 
  Shield, 
  ArrowDown, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Volume2, 
  MicOff, 
  PhoneOff, 
  RefreshCw, 
  Sparkles,
  Camera,
  Heart
} from "lucide-react";
import { Contact } from "../types";

interface HeroProps {
  onScrollToSimulate: () => void;
  contacts: Contact[];
}

export default function Hero({ onScrollToSimulate, contacts }: HeroProps) {
  // Mockup phone interactive states: 
  // 1 = Gallery, 2 = Share sheet, 3 = QRPass custom app, 
  // 4 = WhatsApp Confirmation, 5 = Calling Screen
  const [mockStep, setMockStep] = useState<number>(1);
  const [mockTab, setMockTab] = useState<"send" | "call">("send");
  const [selectedMockContact, setSelectedMockContact] = useState<Contact | null>(null);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);

  // Set default selected contact once contacts are loaded
  useEffect(() => {
    if (contacts.length > 0 && !selectedMockContact) {
      setSelectedMockContact(contacts[0]);
    }
  }, [contacts]);

  // Effect to handle the ticking calling screen timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mockStep === 5) {
      setCallTimer(0);
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mockStep]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedMockContact(contact);
    if (mockTab === "send") {
      setMockStep(4); // WhatsApp sent screen
    } else {
      setMockStep(5); // Call state
    }
  };

  const resetMockPhone = () => {
    setMockStep(1);
    setMockTab("send");
    setIsMuted(false);
    setIsSpeaker(false);
    setCallTimer(0);
  };

  const currentContact = selectedMockContact || contacts[0] || {
    name: "Arjun",
    relation: "Son",
    phone: "+91 98765 43210",
    avatarColor: "from-[#F5A623] to-[#F5D123]",
    initial: "A"
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-6 sm:px-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#F5A623]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#3B82F6]/5 blur-[130px] rounded-full"></div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Pitch and Core Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left reveal-element revealed">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 text-xs text-gray-300 font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
            Made for Parents, Loved by Kids
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display text-white tracking-tight leading-[1.1] mb-6">
            Help your parents pay,<br className="hidden sm:inline" />
            <span className="text-[#F5A623] bg-gradient-to-r from-[#F5A623] to-[#F5D123] bg-clip-text text-transparent font-black">
              remotely & instantly.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mb-8">
            Empower your elderly parents in India. They photograph any shop's UPI QR code, long-press it in their gallery, tap your name, and send it to your WhatsApp or call you instantly—with zero payment app knowledge required.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={onScrollToSimulate}
              className="px-8 py-4 bg-[#F5A623] text-[#080C14] font-extrabold rounded-full text-sm hover:bg-[#F5A623]/90 active:scale-95 shadow-[0_4px_30px_rgba(245,166,35,0.3)] transition-all flex items-center justify-center gap-2 group"
            >
              Try Interactive Sandbox
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => {
                const featuresSec = document.getElementById("how-it-works");
                if (featuresSec) featuresSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full text-sm border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              How It Works
              <ArrowDown className="w-4 h-4 text-[#3B82F6]" />
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Safe</p>
                <p className="text-[10px] text-gray-500">No bank PIN required for parents</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">0% Friction</p>
                <p className="text-[10px] text-gray-500">Works directly from gallery</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F5A623]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Dual Action</p>
                <p className="text-[10px] text-gray-500">Send QR or Call instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive CSS/JS Phone Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Instructions Overlay Helper */}
          <div className="absolute -top-10 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-300 flex items-center gap-1.5 shadow-lg animate-pulse z-40">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Interactive: Click phone screen to try it!</span>
          </div>

          {/* Subtle decorative glow borders */}
          <div className="absolute -inset-4 rounded-[4rem] bg-gradient-to-r from-[#F5A623]/20 to-[#3B82F6]/20 blur-2xl opacity-40"></div>

          {/* Device Mockup Wrapper */}
          <div className="relative w-[300px] h-[610px] sm:w-[325px] sm:h-[650px] bg-black rounded-[3.2rem] p-3 border-[6px] border-[#1C2533] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            
            {/* Dynamic camera notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-40 flex items-center justify-between px-4">
              <div className="w-3 h-3 rounded-full bg-gray-900 border border-white/5"></div>
              <div className="w-10 h-1 bg-gray-900 rounded-full"></div>
            </div>

            {/* Simulated Glass Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-[2.8rem] pointer-events-none z-30"></div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-[#0A101C] rounded-[2.6rem] overflow-hidden flex flex-col z-20">
              
              {/* === SCREEN 1: GALLERY GRID === */}
              {mockStep === 1 && (
                <div className="absolute inset-0 bg-[#0E1524] flex flex-col animate-fadeIn">
                  {/* Header */}
                  <div className="h-14 pt-6 px-4 flex items-center justify-between bg-black/40 border-b border-white/5 shrink-0">
                    <span className="text-xs font-bold text-gray-300 font-display">My Photos</span>
                    <div className="flex gap-2 text-[10px] text-gray-500">
                      <span>Recent</span>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="flex-1 p-3 grid grid-cols-3 gap-2 auto-rows-max overflow-y-auto">
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🌅</div>
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🏠</div>
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🌸</div>
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🍵</div>
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🐈</div>
                    <div className="bg-white/5 aspect-square rounded-lg flex items-center justify-center text-xs text-gray-600">🚗</div>
                    
                    {/* Highlighted QR Code Photo (Clickable) */}
                    <button 
                      onClick={() => setMockStep(2)}
                      className="col-span-3 text-left aspect-video bg-white/10 border-2 border-[#F5A623] hover:bg-white/15 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden mt-2 cursor-pointer transition-all focus:outline-none"
                    >
                      <div className="absolute top-1 right-2 px-1.5 py-0.5 rounded bg-[#F5A623] text-[#080C14] text-[8px] font-black uppercase">
                        New UPI QR
                      </div>
                      
                      <div className="flex gap-3 items-center">
                        {/* Simulated QR block */}
                        <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center relative shrink-0">
                          <div className="w-full h-full grid grid-cols-3 gap-1 opacity-80">
                            <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                            <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                            <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
                          </div>
                          {/* Pulsing ring */}
                          <div className="absolute inset-0 border-2 border-[#F5A623] rounded-lg animate-ping opacity-30"></div>
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Rohan Medicos</p>
                          <p className="text-[9px] text-gray-400">Chemists & Druggists</p>
                          <p className="text-[10px] text-[#F5A623] font-bold mt-1">₹450.00</p>
                        </div>
                      </div>

                      <div className="text-[8px] text-gray-500 font-mono text-right w-full">
                        Captured 1m ago
                      </div>

                      {/* Floating Pointer Tap effect */}
                      <div className="absolute right-6 bottom-4 w-8 h-8 rounded-full bg-[#F5A623]/30 flex items-center justify-center border border-[#F5A623] animate-ping pointer-events-none">
                        <div className="w-3 h-3 bg-[#F5A623] rounded-full"></div>
                      </div>
                    </button>
                  </div>

                  <div className="p-3.5 bg-black/40 text-center text-[11px] text-gray-300 font-bold border-t border-white/5 animate-pulse shrink-0">
                    👉 Click the highlighted QR photo to share
                  </div>
                </div>
              )}

              {/* === SCREEN 2: SYSTEM SHARE SHEET === */}
              {mockStep === 2 && (
                <div className="absolute inset-0 bg-[#0E1524] flex flex-col justify-end animate-fadeIn">
                  {/* Underlay gallery background (stale state preview) */}
                  <div className="p-4 flex-1 opacity-25 flex flex-col justify-between">
                    <span className="text-xs text-gray-400">My Photos</span>
                    <div className="bg-white/10 p-3 rounded-lg flex gap-2">
                      <div className="w-8 h-8 bg-white rounded"></div>
                      <div className="flex-1 bg-white/20 h-8 rounded"></div>
                    </div>
                  </div>

                  {/* Frosted / solid slide-up container */}
                  <div className="bg-[#1C2533] rounded-t-3xl p-5 space-y-4 border-t border-white/10 shadow-2xl relative z-40 animate-slideUp">
                    <div className="w-12 h-1.5 bg-white/25 rounded-full mx-auto mb-1"></div>
                    
                    {/* Share Preview */}
                    <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <div className="w-10 h-10 bg-white/15 rounded flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">IMG_20260712_QR.jpg</p>
                        <p className="text-[10px] text-gray-400">Captured in Pune chemist shop</p>
                      </div>
                    </div>

                    {/* Share Apps Row */}
                    <div className="text-left">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Recommended Family Channels</p>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col items-center gap-1.5 opacity-30">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">💬</div>
                          <span className="text-[9px] text-gray-400">WhatsApp</span>
                        </div>
                        
                        {/* QRPass Highlighted App (Clickable) */}
                        <button 
                          onClick={() => setMockStep(3)}
                          className="flex flex-col items-center gap-1.5 relative cursor-pointer focus:outline-none group focus:ring-2 focus:ring-[#F5A623] rounded-lg p-1"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#F5A623] flex items-center justify-center text-[#080C14] font-black text-base shadow-[0_0_15px_rgba(245,166,35,0.4)] group-hover:scale-105 transition-transform">
                            QR
                          </div>
                          <span className="text-[9px] text-[#F5A623] font-extrabold tracking-wide">QRPass</span>

                          {/* Pulsing indicator on QRPass */}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#1C2533] flex items-center justify-center">
                            <span className="block w-2 h-2 bg-white rounded-full animate-ping"></span>
                          </div>
                        </button>

                        <div className="flex flex-col items-center gap-1.5 opacity-30">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm">📬</div>
                          <span className="text-[9px] text-gray-400">Messages</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 opacity-30">
                          <div className="w-12 h-12 rounded-2xl bg-gray-500/10 flex items-center justify-center text-gray-400 text-sm">🔗</div>
                          <span className="text-[9px] text-gray-400">Copy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 text-center text-[10px] text-gray-400 border-t border-white/5 shrink-0">
                    Tap saffron "QRPass" app option to open contacts list
                  </div>
                </div>
              )}

              {/* === SCREEN 3: QRPASS APP WITH TWO TABS === */}
              {mockStep === 3 && (
                <div className="absolute inset-0 bg-[#080C14] flex flex-col animate-fadeIn">
                  {/* Custom Header with Tabs */}
                  <div className="pt-6 px-4 pb-2 bg-[#0F1626] border-b border-white/5 shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-[#F5A623] font-display">QRPass Secure</span>
                      <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-bold">1-Tap Family Link</span>
                    </div>

                    {/* Dual Action Tabs */}
                    <div className="grid grid-cols-2 bg-white/5 rounded-xl p-1 gap-1">
                      <button
                        onClick={() => setMockTab("send")}
                        className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                          mockTab === "send"
                            ? "bg-[#F5A623] text-[#080C14]"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Send QR Code
                      </button>
                      <button
                        onClick={() => setMockTab("call")}
                        className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                          mockTab === "call"
                            ? "bg-[#10B981] text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Phone className="w-3 h-3 fill-current" />
                        Call Family
                      </button>
                    </div>
                  </div>

                  {/* Body Contacts list */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-3 text-left">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {mockTab === "send" ? "Choose Family Payee" : "Choose Who To Call"}
                    </p>
                    
                    {contacts.length === 0 ? (
                      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center">
                        <p className="text-xs text-gray-400">No pre-saved family contacts found.</p>
                        <p className="text-[10px] text-gray-500 mt-1">Please use the Sandbox form below to add a family contact!</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {contacts.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleContactClick(c)}
                            className={`w-full p-3 bg-white/5 border hover:bg-white/10 border-white/5 rounded-2xl flex items-center justify-between transition-all text-left focus:outline-none focus:border-[#F5A623] group`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${c.avatarColor} flex items-center justify-center text-[#080C14] font-black text-xs`}>
                                {c.initial}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white group-hover:text-[#F5A623] transition-colors">{c.name}</p>
                                <span className="text-[9px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded-full font-medium">
                                  {c.relation}
                                </span>
                              </div>
                            </div>

                            {/* State indicator button */}
                            {mockTab === "send" ? (
                              <div className="px-2.5 py-1 rounded-lg bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-black uppercase tracking-wider group-hover:bg-[#F5A623] group-hover:text-[#080C14] transition-all">
                                Send
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all">
                                <Phone className="w-3.5 h-3.5 fill-current" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Back button to gallery */}
                  <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
                    <button onClick={() => setMockStep(2)} className="text-[10px] text-gray-500 hover:text-white">
                      ← Back
                    </button>
                    <p className="text-[9px] text-gray-400">
                      Select a name to trigger simulation
                    </p>
                  </div>
                </div>
              )}

              {/* === SCREEN 4: WHATSAPP SENT CONFIRMATION SCREEN === */}
              {mockStep === 4 && (
                <div className="absolute inset-0 bg-[#0B141A] flex flex-col animate-fadeIn">
                  {/* WhatsApp Top bar */}
                  <div className="h-16 pt-5 px-3 bg-[#1F2C34] flex items-center gap-2 border-b border-black/10 shrink-0">
                    <button 
                      onClick={() => setMockStep(3)}
                      className="text-white text-xs hover:text-gray-300 pr-1 focus:outline-none"
                    >
                      ←
                    </button>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentContact.avatarColor} flex items-center justify-center text-[#080C14] font-black text-xs shrink-0`}>
                      {currentContact.initial}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-extrabold text-white">{currentContact.name} ({currentContact.relation})</p>
                      <p className="text-[9px] text-emerald-400">online</p>
                    </div>
                  </div>

                  {/* Chat window */}
                  <div className="flex-1 p-3 flex flex-col justify-end space-y-4 overflow-y-auto">
                    
                    {/* WhatsApp chat bubble */}
                    <div className="self-end bg-[#005C4B] p-2 rounded-2xl rounded-tr-none text-[10px] max-w-[85%] shadow-lg text-left border border-white/5">
                      {/* Inner QR Pass Rich Card */}
                      <div className="bg-[#0E1524] rounded-xl p-2 mb-2 border border-white/10">
                        <div className="flex gap-2 items-center mb-1.5">
                          <div className="w-10 h-10 bg-white p-1 rounded flex items-center justify-center shrink-0">
                            <div className="w-full h-full grid grid-cols-3 gap-0.5 opacity-90">
                              <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                              <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                              <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white leading-tight">Rohan Medicos</p>
                            <p className="text-[8px] text-gray-500">QRPass Secure Payload</p>
                            <p className="text-[9px] text-[#F5A623] font-black mt-0.5">₹450.00</p>
                          </div>
                        </div>
                        
                        <div className="w-full py-1 bg-[#3B82F6] text-white font-extrabold text-center rounded text-[8px] tracking-wide">
                          📲 SCAN & PAY REMOTELY
                        </div>
                      </div>

                      <p className="text-white text-[10px] leading-tight px-1">
                        Appa: Pay for this medicine shop via QRPass link.
                      </p>
                      
                      <span className="block text-[7px] text-emerald-300 text-right mt-1 font-mono">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
                      </span>
                    </div>

                    {/* Auto success response from Arjun */}
                    <div className="self-start bg-[#1F2C34] p-3 rounded-2xl rounded-tl-none text-[10px] max-w-[80%] shadow text-left">
                      <p className="text-white">Done Appa! Paid ₹450 to Rohan Medicos. Received confirmation 👍</p>
                      <span className="block text-[7px] text-gray-400 mt-1 font-mono">1m ago</span>
                    </div>
                  </div>

                  {/* Reset confirmation */}
                  <div className="p-3 bg-[#1F2C34] border-t border-white/5 flex flex-col gap-2 shrink-0">
                    <button
                      onClick={resetMockPhone}
                      className="w-full py-2 bg-[#F5A623] text-[#080C14] hover:bg-[#F5A623]/90 text-[10px] font-black uppercase rounded-lg tracking-wider transition-all flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                      Restart Phone Demo
                    </button>
                  </div>
                </div>
              )}

              {/* === SCREEN 5: CALLING STATE === */}
              {mockStep === 5 && (
                <div className="absolute inset-0 bg-[#0F1626] flex flex-col justify-between p-6 animate-fadeIn text-center">
                  
                  {/* Top status & header */}
                  <div className="pt-8">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">
                      Direct Parent Hot-Call
                    </span>
                    <h4 className="text-lg font-black font-display text-white mt-4">{currentContact.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{currentContact.relation} • {currentContact.phone}</p>
                    <p className="text-xs font-mono font-bold text-emerald-400 mt-3">{formatTimer(callTimer)}</p>
                  </div>

                  {/* Large pulsing green avatar */}
                  <div className="flex justify-center my-6 relative">
                    <div className="relative">
                      {/* Double green glow pulsing rings */}
                      <div className="absolute -inset-4 rounded-full border border-emerald-400/20 animate-ping opacity-75"></div>
                      <div className="absolute -inset-8 rounded-full border border-emerald-400/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
                      
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${currentContact.avatarColor} border-4 border-emerald-400 flex items-center justify-center text-[#080C14] font-black text-2xl relative z-10`}>
                        {currentContact.initial}
                      </div>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="space-y-6">
                    <div className="flex justify-center gap-6">
                      {/* Mute toggle */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                          isMuted 
                            ? "bg-white text-[#080C14] font-bold" 
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        <MicOff className="w-4 h-4" />
                      </button>

                      {/* Speaker toggle */}
                      <button
                        onClick={() => setIsSpeaker(!isSpeaker)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                          isSpeaker 
                            ? "bg-emerald-500 text-white" 
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Red Hang up button */}
                    <button
                      onClick={() => setMockStep(3)}
                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>Hang Up Call</span>
                    </button>
                  </div>

                  <div className="text-[9px] text-gray-500 font-medium">
                    Call operates over local encrypted channels.
                  </div>
                </div>
              )}

              {/* Home Indicator bar */}
              <div className="h-4 bg-black/60 flex items-center justify-center shrink-0">
                <div className="w-20 h-1 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
