import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { CustomButton } from "./primaryButtons";
import "../styles/Errormessage.css";

type ErrorProp = {
  message: string;
  onRetry: () => void;
};

export const ErrorMessage = memo(({ message, onRetry }: ErrorProp) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="message-card error-message"
      role="alert"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <FiAlertTriangle className="message-card-icon" aria-hidden="true" />
      <p>{message}</p>
      <CustomButton title="Try again" onPress={onRetry} />
    </motion.section>
  );
});
