import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "9779858521000";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Namaste, I would like to know more about Sudurpashchim tourism.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HANS on WhatsApp"
      className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
}
