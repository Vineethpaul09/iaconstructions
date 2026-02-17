import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919154450123"; // India number (kept per request)
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I'm interested in your properties. Could you share more details and availability? — Regards, [Name]"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-4 sm:right-6 z-50 group flex items-center gap-0 hover:gap-2 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      {/* Expanded text */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:mr-1">
        Chat with iA Constructions
      </span>

      {/* Green circle with icon */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-200 group-hover:scale-110">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white relative z-10"
        >
          <path d="M16.004 3.2C8.94 3.2 3.2 8.935 3.2 15.997c0 2.263.593 4.472 1.72 6.413L3.2 28.8l6.6-1.728a12.747 12.747 0 006.198 1.593h.006c7.06 0 12.796-5.735 12.796-12.797S23.064 3.2 16.004 3.2zm0 23.385a10.55 10.55 0 01-5.387-1.479l-.386-.229-4.006 1.05 1.07-3.905-.252-.4a10.539 10.539 0 01-1.616-5.625c0-5.848 4.76-10.605 10.612-10.605 2.833 0 5.494 1.103 7.498 3.108a10.544 10.544 0 013.105 7.502c-.002 5.849-4.762 10.583-10.638 10.583zm5.816-7.939c-.318-.16-1.885-.93-2.178-1.037-.293-.107-.507-.16-.72.16-.213.318-.826 1.037-1.012 1.25-.187.213-.374.24-.692.08-.318-.16-1.344-.495-2.56-1.579-.946-.844-1.585-1.887-1.771-2.205-.186-.319-.02-.49.14-.65.144-.143.318-.374.478-.56.159-.187.213-.32.319-.533.106-.213.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.376-.26-.624-.524-.54-.72-.55-.186-.008-.4-.01-.612-.01a1.176 1.176 0 00-.853.4c-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.094 1.306 3.307.16.213 2.254 3.44 5.463 4.824.763.33 1.36.527 1.824.674.767.244 1.465.21 2.017.127.615-.092 1.885-.77 2.15-1.513.267-.744.267-1.382.187-1.514-.08-.132-.293-.213-.612-.373z" />
        </svg>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
