import { useState } from "react";
import { Sparkles, Send, X, Bot, ShieldAlert, Cpu } from "lucide-react";
import { useNavigate } from "react-router";

export default function SmartAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am KRA SmartAsset AI Assistant. Ask me about device locations, high-risk assets, warranty expirations, or clearance progress.",
    },
  ]);
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query.trim();
    const newMsgs = [...messages, { sender: "user", text: userText }];
    setMessages(newMsgs);
    setQuery("");

    // Simulate AI response evaluation
    setTimeout(() => {
      let reply = "";
      const lower = userText.toLowerCase();

      if (lower.includes("000451") || lower.includes("thinkpad") || lower.includes("abel")) {
        reply = "Asset ICT-000451 (Lenovo ThinkPad T14) is assigned to Abel Mwangi at Machakos Office. Current Health Score: 82/100. Battery health: 42% (Replacement recommended in ~45 days).";
      } else if (lower.includes("risk") || lower.includes("high risk") || lower.includes("000104")) {
        reply = "Found 1 High-Risk Asset needing attention: ICT-000104 (HP EliteBook 840 G8) in Eldoret Office. Risk Score: 8/10. Reason: Offline 25 days, BitLocker suspended, IP changed 6 times.";
      } else if (lower.includes("clearance") || lower.includes("mercy") || lower.includes("pending")) {
        reply = "Clearance Request #2 for Mercy Wanjiku (Mombasa Port) is currently PENDING. 1 asset (ICT-000305) is awaiting physical ICT QR verification scan.";
      } else if (lower.includes("certificate") || lower.includes("valid") || lower.includes("789")) {
        reply = "Certificate KRA-ACC-2025-000789 for Abel Mwangi is VALID & CLEARED. 3 assets verified and signed off.";
      } else {
        reply = `SmartAsset AI Analysis: Searched KRA Asset Registry for '${userText}'. Found matching records across 4 stations (Times Tower, Machakos, Mombasa, Eldoret). Audit status normal.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 text-white font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
      >
        <Sparkles size={18} className="animate-pulse text-amber-300" />
        <span className="text-sm">Smart AI Assistant</span>
      </button>

      {/* AI Assistant Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full sm:w-[440px] bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col h-[520px]">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-amber-400">
                    <Bot size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
                    KRA SmartAsset AI Assistant
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Natural Language ICT Intelligence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900 text-sm">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 flex flex-wrap gap-1.5">
              <button
                onClick={() => setQuery("Where is asset ICT-000451?")}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Where is ICT-000451?
              </button>
              <button
                onClick={() => setQuery("Show high risk assets")}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Show high risk assets
              </button>
              <button
                onClick={() => setQuery("Pending clearances")}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Pending clearances
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI about assets, risk scores, certificates..."
                className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
