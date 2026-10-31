import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/empty.css";

type messageProp = {
  message: string;
};

export const Empty = memo(({ message }: messageProp) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="message-card empty-state"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <FiShoppingBag className="message-card-icon" aria-hidden="true" />
      <p>{message}</p>
      <Link className="empty-state-link" to="/menu">
        Browse the menu
      </Link>
    </motion.section>
  );
});
