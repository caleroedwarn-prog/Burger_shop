import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import "../styles/Primarybutton.css";

type buttonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline";
};

export const CustomButton = memo(
  ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = "primary",
  }: buttonProps) => {
    const isDisabled = disabled || loading;
    const reduceMotion = useReducedMotion();

    return (
      <motion.button
        type="button"
        className={`primary-button primary-button--${variant}`}
        onClick={(event) => {
          event.stopPropagation();
          onPress();
        }}
        disabled={isDisabled}
        aria-busy={loading}
        whileHover={
          reduceMotion || isDisabled
            ? undefined
            : {
                y: -1,
                backgroundColor:
                  variant === "outline"
                    ? "var(--primary)"
                    : "var(--primary-hover)",
              }
        }
        whileTap={reduceMotion || isDisabled ? undefined : { scale: 0.98 }}
      >
        <span className={loading ? "primary-button-label is-loading" : "primary-button-label"}>
          {title}
        </span>
        {loading && <span className="primary-button-spinner" aria-hidden="true" />}
      </motion.button>
    );
  },
);
