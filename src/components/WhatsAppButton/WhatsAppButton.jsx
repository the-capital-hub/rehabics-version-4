
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import "./WhatsAppButton.css";

const WHATSAPP_NUMBER = "910000000000";

const WHATSAPP_MESSAGE =
  "Hello Rehabics, I would like to know more about your physiotherapy services.";

export default function WhatsAppFloatingButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rv3WhatsAppButton"
      aria-label="Chat with Rehabics on WhatsApp"
      title="Chat with us on WhatsApp"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="rv3WhatsAppTooltip">
        Chat with us
      </span>

      <span className="rv3WhatsAppIcon">
        <FaWhatsapp />
      </span>

      <span className="rv3WhatsAppLabel">
        WhatsApp
      </span>
    </motion.a>
  );
}
