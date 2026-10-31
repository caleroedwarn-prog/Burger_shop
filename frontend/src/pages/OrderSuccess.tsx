import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/primaryButtons";
import Seo from "../components/Seo";
import { socials } from "../constants/siteData";
import "../styles/orderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const whatsapp = socials.find(({ name }) => name === "WhatsApp");

  return (
    <main className="order-success-page">
      <Seo
        title="Order placed"
        description="Your Burger Taste order has been placed. We will contact you soon to confirm."
        image="/og-share-image.jpg"
        path="/order-success"
      />
      <section className="order-success-card" aria-labelledby="order-success-heading">
        <motion.svg
          className="order-success-check"
          viewBox="0 0 72 72"
          role="img"
          aria-label="Order placed successfully"
          initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <circle cx="36" cy="36" r="32" />
          <motion.path
            d="M21 37.5 31.5 48 52 26"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
          />
        </motion.svg>
        <h1 id="order-success-heading">Order placed!</h1>
        <p>We will contact you soon to confirm.</p>
        <div className="order-success-actions">
          <CustomButton
            title="Back to menu"
            onPress={() => navigate("/menu")}
          />
          {whatsapp && (
            <a
              className="order-success-whatsapp"
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
