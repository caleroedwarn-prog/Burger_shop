import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import "../styles/categorychip.css";

type PillProp = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const Category = memo(({ label, selected, onPress }: PillProp) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="category-chip-wrapper">
      <motion.button
        type="button"
        className={`category-chip${selected ? " is-selected" : ""}`}
        aria-pressed={selected}
        onClick={onPress}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      >
        {selected && (
          <motion.span
            className="category-chip-highlight"
            layoutId={reduceMotion ? undefined : "category-chip-highlight"}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            aria-hidden="true"
          />
        )}
        <span className="category-chip-label">{label}</span>
      </motion.button>
    </div>
  );
});
