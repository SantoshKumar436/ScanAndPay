import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Send, 
  Phone, 
  CheckCircle2, 
  Volume2, 
  MicOff, 
  PhoneOff, 
  RefreshCw, 
  ShieldCheck, 
  QrCode, 
  Info,
  Check,
  User,
  Heart
} from "lucide-react";
import { Contact } from "../types";

interface InteractiveShowcaseProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function InteractiveShowcase({ contacts, setContacts }: InteractiveShowcaseProps) {
  // Selected receiver in the Sandbox
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  // Auto-select first contact if none selected
  useEffect(() => {
    if (contacts.length > 0 && !selectedContactId) {
      setSelectedContactId(contacts[0].id);
    }
  }, [contacts, selectedContactId]);

  // Custom transaction state
  const [merchantName, setMerchantName] = useState("Rohan Medicos");
  const [txnAmount, setTxnAmount] = useState("450");

  // New contact form fields
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("Son");
  const [newPhone, setNewPhone] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Simulation mode: "NONE" | "SEND_QR" | "CALL"
  const [simMode, setSimMode] = useState<"NONE" | "SEND_QR" | "CALL">("NONE");
  
  // WhatsApp sub-state
  const [isPaid, setIsPaid] = useState(false);

  // Call sub-state
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  // Selected contact details helper
  const selectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0] || {
    id: "fallback",
    name: "Arjun",
    relation: "Son",
    phone: "+91 98765 43210",
    avatarColor: "from-[#F5A623] to-[#F5D123]",
    initial: "A"
  };

  // Effect to handle calling timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (simMode === "CALL" && isCallActive) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simMode, isCallActive]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    if (contacts.length >= 6) {
      alert("Maximum 6 family contacts allowed for a clean family circle.");
      return;
    }

    const colors = [
      "from-[#F5A623] to-[#F5D123]",
      "from-[#3B82F6] to-[#60A5FA]",
      "from-[#10B981] to-[#34D399]",
      "from-[#8B5CF6] to-[#A78BFA]",
      "from-[#EC4899] to-[#F472B6]",
      "from-[#F43F5E] to-[#FDA4AF]"
    ];
    const randomColor = colors[contacts.length % colors.length];

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newName.trim(),
      relation: newRelation,
      phone: newPhone.trim(),
      avatarColor: randomColor,
      initial: newName.trim().charAt(0).toUpperCase(),
    };

    setContacts((prev) => [...prev, newContact]);
    setSelectedContactId(newContact.id);
    setNewName("");
    setNewPhone("");
    setShowAddForm(false);
  };

  const handleDeleteContact = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (contacts.length <= 1) {
      alert("You must keep at least one family contact for the simulation.");
      return;
    }
    const filtered = contacts.filter((c) => c.id !== id);
    setContacts(filtered);
    if (selectedContactId === id) {
      setSelectedContactId(filtered[0].id);
    }
    // Reset active simulation if deleted contact was targeted
    if (selectedContactId === id) {
      setSimMode("NONE");
    }
  };

  const triggerSendQR = () => {
    if (!txnAmount || isNaN(Number(txnAmount)) || Number(txnAmount) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }
    setIsPaid(false);
    setSimMode("SEND_QR");
  };

  const triggerCall = () => {
    setCallTimer(0);
    setIsMuted(false);
    setIsSpeaker(false);
    setIsCallActive(true);
    setSimMode("CALL");
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section id="simulator" className="py-24 px-6 sm:px-8 relative bg-[#080C14]">
      {/* Visual background pattern grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F5A623] text-xs font-black uppercase tracking-widest bg-[#F5A623]/10 px-3.5 py-1.5 rounded-full border border-[#F5A623]/10">
            Live Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight mt-6 mb-4">
            Test the Interactive Sandbox
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Configure your family contact book, set up custom merchant transactions, and test exactly how the parent-child payment and direct calling loops function.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Setup Panel & Inputs (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Step 1: Manage Contacts */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/5 blur-2xl rounded-full"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl font-display text-white">1. Family Contacts Book</h3>
                  <p className="text-xs text-gray-400 mt-1">Manage up to 6 members who can scan and pay for parents</p>
                </div>
                {contacts.length < 6 ? (
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-3.5 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    {showAddForm ? "Cancel" : "Add Member"}
                  </button>
                ) : (
                  <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[#F5A623] font-bold">
                    Max 6 Contacts Limit
                  </span>
                )}
              </div>

              {/* Add Member Form */}
              {showAddForm && (
                <form onSubmit={handleAddContact} className="mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4 animate-slideUp">
                  <p className="text-xs font-black text-[#F5A623] uppercase tracking-wider">Add New Member</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Relationship</label>
                      <select
                        value={newRelation}
                        onChange={(e) => setNewRelation(e.target.value)}
                        className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]"
                      >
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Son-in-law">Son-in-law</option>
                        <option value="Daughter-in-law">Daughter-in-law</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Grandchild">Grandchild</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 00000"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#080C14] text-xs font-black rounded-xl transition-all"
                  >
                    Save Family Contact
                  </button>
                </form>
              )}

              {/* Contacts Grid */}
              <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                {contacts.map((contact) => {
                  const isSelected = selectedContactId === contact.id;
                  return (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setSelectedContactId(contact.id);
                        setSimMode("NONE"); // Clear previous simulation to let user start fresh
                      }}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? "bg-gradient-to-r from-white/10 to-white/5 border-[#F5A623] shadow-md shadow-[#F5A623]/5"
                          : "bg-white/0 hover:bg-white/5 border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${contact.avatarColor} flex items-center justify-center text-[#080C14] font-black text-xs shrink-0`}>
                          {contact.initial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-white">{contact.name}</p>
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-white/5 text-[#F5A623]">
                              {contact.relation}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{contact.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#F5A623]" : "border-white/10"}`}>
                          {isSelected && <div className="w-2 h-2 bg-[#F5A623] rounded-full"></div>}
                        </div>
                        <button
                          onClick={(e) => handleDeleteContact(contact.id, e)}
                          className="p-1.5 rounded bg-white/0 hover:bg-red-500/10 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Live Merchant QR Generator Visualizer */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-2xl rounded-full"></div>
              
              <h3 className="font-extrabold text-lg sm:text-xl font-display text-white mb-6">2. Simulated Merchant QR</h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Left Mini Visualizer QR with Pulsing Rings */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    
                    {/* Synchronized Expanding Radar Rings */}
                    <div className="absolute inset-0 border border-[#F5A623]/40 rounded-2xl animate-qr-pulse"></div>
                    <div className="absolute inset-0 border border-[#3B82F6]/30 rounded-2xl animate-qr-pulse" style={{ animationDelay: "1s" }}></div>
                    
                    <div className="w-20 h-20 bg-white p-1 rounded-lg shadow-xl relative z-10">
                      <div className="w-full h-full grid grid-cols-4 gap-0.5">
                        <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                        <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                        <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                        <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#F5A623] font-bold mt-2 tracking-widest uppercase animate-pulse">
                    Scan Active
                  </span>
                </div>

                {/* Right Form controls */}
                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Shop Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh General Store"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">₹</span>
                      <input
                        type="number"
                        value={txnAmount}
                        onChange={(e) => setTxnAmount(e.target.value)}
                        className="w-full bg-[#0E1524] border border-white/10 rounded-xl pl-6 pr-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#F5A623]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Sandbox Simulator Dashboard (lg:col-span-6) */}
          <div className="lg:col-span-6">
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md text-left min-h-[580px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 blur-2xl rounded-full"></div>
              
              <div>
                {/* Dashboard top details */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl font-display text-white">3. Simulator Console</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Target Payee: <strong className="text-white">{selectedContact.name} ({selectedContact.relation})</strong>
                    </p>
                  </div>
                  <span className="text-[10px] bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/15 px-3 py-1.5 rounded-xl font-black uppercase tracking-wider">
                    Ready
                  </span>
                </div>

                {/* Main Action buttons for simulation triggers */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={triggerSendQR}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#F5A623] ${
                      simMode === "SEND_QR" 
                        ? "bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]" 
                        : "bg-[#0E1524] border-white/5 hover:border-white/10 text-gray-300"
                    }`}
                  >
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider">Send QR</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">WhatsApp loop</p>
                    </div>
                  </button>

                  <button
                    onClick={triggerCall}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#10B981] ${
                      simMode === "CALL" 
                        ? "bg-[#10B981]/10 border-[#10B981] text-[#10B981]" 
                        : "bg-[#0E1524] border-white/5 hover:border-white/10 text-gray-300"
                    }`}
                  >
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider">Call Family</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Hotline call</p>
                    </div>
                  </button>
                </div>

                {/* SIMULATOR VIEWPANEL */}
                <div className="bg-[#0E1524] rounded-2xl p-4 border border-white/5 min-h-[290px] flex flex-col justify-center relative">
                  
                  {/* === CASE A: EMPTY SIM STATE === */}
                  {simMode === "NONE" && (
                    <div className="text-center p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500 border border-white/5">
                        <QrCode className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-white">Console Idle</p>
                      <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                        Pick a contact in Step 1, then click either <strong className="text-[#F5A623]">Send QR</strong> or <strong className="text-[#10B981]">Call Family</strong> above to activate high-fidelity simulations.
                      </p>
                    </div>
                  )}

                  {/* === CASE B: SEND QR WHATSAPP LOOP === */}
                  {simMode === "SEND_QR" && (
                    <div className="space-y-4 text-left animate-fadeIn">
                      
                      {/* WhatsApp Header indicator */}
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        WhatsApp Thread: {selectedContact.name} ({selectedContact.relation})
                      </div>

                      {/* WhatsApp bubble if not paid */}
                      {!isPaid ? (
                        <div className="space-y-3">
                          {/* Rich message bubble */}
                          <div className="bg-[#005C4B] p-3 rounded-2xl rounded-tr-none text-white max-w-[90%] ml-auto shadow-md border border-white/5">
                            
                            <div className="bg-[#080C14] rounded-xl p-3 mb-2.5 border border-white/10">
                              <div className="flex gap-2 items-center mb-2">
                                <div className="w-10 h-10 bg-white p-1 rounded flex items-center justify-center shrink-0">
                                  <QrCode className="w-8 h-8 text-black" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-white leading-tight">{merchantName}</p>
                                  <p className="text-[8px] text-gray-400">QRPass Attachment</p>
                                  <p className="text-xs font-black text-[#F5A623] mt-0.5">₹{txnAmount}.00</p>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => setIsPaid(true)}
                                className="w-full py-2 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-extrabold text-center rounded-lg text-[9px] tracking-widest uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                📲 SCAN & PAY REMOTELY
                              </button>
                            </div>

                            <p className="text-[10px] leading-tight px-1 text-gray-100">
                              Appa: Photograph of shop QR. Please pay ₹{txnAmount} for Rohan Medicos.
                            </p>
                          </div>

                          <div className="p-3 bg-white/5 border border-dashed border-white/10 rounded-xl text-center">
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                              👆 Act as <strong className="text-white">{selectedContact.name}</strong>! Click the blue <strong>"SCAN & PAY"</strong> inside the chat bubble to simulate your kid paying remotely.
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* Payment confirmed card */
                        <div className="space-y-4 animate-fadeIn">
                          {/* Success animation block */}
                          <div className="p-4 bg-emerald-500/15 border border-emerald-500/10 rounded-2xl text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto border border-emerald-400/20">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                              <p className="text-xs font-black text-white uppercase tracking-wider">Payment Complete!</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">₹{txnAmount} successfully paid to {merchantName}.</p>
                            </div>
                          </div>

                          {/* Instant receipt response on thread */}
                          <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-[10px] max-w-[85%] text-left border border-white/5 text-gray-300">
                            <p className="font-extrabold text-white mb-1">Reply from {selectedContact.name}:</p>
                            <p className="leading-tight">Done Appa! Paid ₹{txnAmount} to {merchantName} instantly. Got receipt confirmation. 👍</p>
                          </div>

                          <button
                            onClick={() => setIsPaid(false)}
                            className="text-[10px] text-gray-400 hover:text-white underline block mx-auto text-center cursor-pointer"
                          >
                            Reset payment state
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                  {/* === CASE C: HOTLINE CALLING CARD === */}
                  {simMode === "CALL" && (
                    <div className="text-center space-y-4 animate-fadeIn">
                      
                      {isCallActive ? (
                        /* Active calling view */
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded">
                              Direct Call Link
                            </span>
                            <h4 className="text-base font-black text-white mt-3 font-display">{selectedContact.name}</h4>
                            <p className="text-[10px] text-gray-400">{selectedContact.relation} • {selectedContact.phone}</p>
                            <p className="text-sm font-mono font-bold text-emerald-400 mt-2">{formatTimer(callTimer)}</p>
                          </div>

                          {/* Pulsing Avatar */}
                          <div className="flex justify-center relative my-4">
                            <div className="relative">
                              <div className="absolute -inset-3 rounded-full border border-emerald-400/20 animate-ping"></div>
                              <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${selectedContact.avatarColor} border-2 border-emerald-400 flex items-center justify-center text-[#080C14] font-black text-base relative z-10`}>
                                {selectedContact.initial}
                              </div>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => setIsMuted(!isMuted)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                isMuted ? "bg-white text-black" : "bg-white/5 text-gray-300 hover:bg-white/10"
                              }`}
                            >
                              <MicOff className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setIsSpeaker(!isSpeaker)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                isSpeaker ? "bg-emerald-500 text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => setIsCallActive(false)}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 mx-auto active:scale-95"
                          >
                            <PhoneOff className="w-3.5 h-3.5" />
                            <span>End Hotline Call</span>
                          </button>
                        </div>
                      ) : (
                        /* Call ended view */
                        <div className="space-y-4 py-4 animate-fadeIn">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-400 border border-white/5">
                            <PhoneOff className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-white uppercase tracking-wider">Call Ended</p>
                            <p className="text-[10px] text-gray-400 mt-1">Duration: {formatTimer(callTimer)}</p>
                          </div>

                          <div className="flex justify-center gap-4">
                            <button
                              onClick={triggerCall}
                              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                            >
                              <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                              Call Again
                            </button>
                            <button
                              onClick={() => setSimMode("NONE")}
                              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl text-[10px]"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>

              {/* Bottom security reassurance */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 shrink-0">
                <span className="flex items-center gap-1 text-[#10B981] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct secure tunnels
                </span>
                <span>Sandbox v1.0.2</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
