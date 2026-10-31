import { motion, useReducedMotion } from "framer-motion";
import { memo, useId } from "react";
import { FiAlertCircle } from "react-icons/fi";
import "../styles/formfield.css";

type InputFieldProp = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: "text" | "email" | "tel" | "number" | "password";
};

export const InputField = memo(
  ({
    label,
    value,
    onChangeText,
    error = "",
    keyboardType = "text",
  }: InputFieldProp) => {
    const id = useId();
    const errorId = `${id}-error`;
    const reduceMotion = useReducedMotion();

    return (
      <motion.div
        className="form-field"
        initial={false}
        animate={error && !reduceMotion ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.24 }}
      >
        <label className="form-field-label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className="form-field-input"
          type={keyboardType}
          value={value}
          onChange={(event) => onChangeText(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p className="form-field-error" id={errorId} role="alert">
            <FiAlertCircle aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </motion.div>
    );
  },
);
