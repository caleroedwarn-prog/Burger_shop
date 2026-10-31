import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname, reduceMotion]);

  return null;
}

export default ScrollManager;
