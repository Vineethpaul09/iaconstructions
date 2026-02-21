import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Types ─────────────────────────────────────────── */

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

/* ─── Hardcoded bot responses ───────────────────────── */

const QUICK_ACTIONS = [
  "Show me villas",
  "What's your best deal?",
  "Schedule a visit",
] as const;

const BOT_RESPONSES: Record<string, string> = {
  "Show me villas":
    "We have stunning villas starting from ₹1.8 Cr in Hyderabad and Secunderabad. Our top picks include the IAC Serenity Villas (4 BHK, 3200 sq ft) and IAC Greenfield Estate (5 BHK, 4500 sq ft). Would you like more details on any of these?",
  "What's your best deal?":
    "Our current best deal is the IAC Skyline 3 BHK apartments in Gachibowli, Hyderabad — offered at a special pre-launch price of ₹89 L with no GST, free modular kitchen, and a 0% booking amount scheme. Limited units left!",
  "Schedule a visit":
    "I'd love to arrange a site visit for you! Please share your preferred date, time, and the project you're interested in. Alternatively, you can call us at +17787645123 to book instantly.",
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "bot",
  text: "Hello! I'm your AI property assistant. Ask me about properties, pricing, or schedule a visit.",
};

const FALLBACK_RESPONSE =
  "Thanks for your question! Our team will get back to you shortly. In the meantime, you can call us at +17787645123 for immediate assistance.";

/* ─── Component ─────────────────────────────────────── */

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: "bot" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}-${Math.random()}`, role, text },
    ]);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    addMessage("user", text.trim());
    setInputValue("");

    // Simulate bot response delay
    setTimeout(() => {
      const response =
        BOT_RESPONSES[text.trim() as keyof typeof BOT_RESPONSES] ??
        FALLBACK_RESPONSE;
      addMessage("bot", response);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend(inputValue);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.3 }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-28 right-4 sm:right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#a8861e] text-[#0B1F3A] shadow-lg shadow-[#C9A227]/25 transition-transform hover:scale-110 cursor-pointer"
        aria-label="Open AI chat"
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-40 right-4 sm:right-6 z-50 flex w-[calc(100vw-2rem)] sm:w-[350px] max-w-[350px] flex-col overflow-hidden rounded-2xl border border-[#1a3a5c] bg-[#0f2847]/90 backdrop-blur-xl shadow-2xl"
            style={{ height: 500 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1a3a5c] bg-gradient-to-r from-[#122d4d] to-[#0f2847] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/20">
                  <Bot className="h-4 w-4 text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#fafafa]">
                    AI Property Assistant
                  </p>
                  <p className="text-xs text-[#25D366]">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-[#e4e4e7] transition-colors hover:bg-[#1a3a5c] hover:text-[#fafafa] cursor-pointer"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#C9A227] text-[#0B1F3A] rounded-br-sm"
                        : "bg-[#1a3a5c] text-[#fafafa] rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 1 && (
              <div className="flex gap-2 px-4 pb-2 flex-wrap">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1.5 text-xs text-[#C9A227] transition-colors hover:bg-[#C9A227]/20 cursor-pointer"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-[#1a3a5c] bg-[#122d4d] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  className="flex-1 rounded-lg border border-[#1a3a5c] bg-[#0f2847] px-3 py-2 text-sm text-[#fafafa] placeholder:text-[#e4e4e7] outline-none transition-colors focus:border-[#C9A227]/50"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="h-9 w-9 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
