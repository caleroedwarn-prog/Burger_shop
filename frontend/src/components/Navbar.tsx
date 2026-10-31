import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { navLinks } from "../constants/siteData";
import { CustomButton } from "./primaryButtons";
import "../styles/navbar.css";

const drawerId = "mobile-navigation";

function Navbar() {
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openLocationKey, setOpenLocationKey] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const isDrawerOpen = openLocationKey === location.key;
  const closeDrawer = useCallback(() => setOpenLocationKey(null), []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const toggleElement = toggleRef.current;
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      toggleElement?.focus();
    };
  }, [closeDrawer, isDrawerOpen]);

  const navClassName = (to: string) => ({ isActive }: { isActive: boolean }) => {
    const isHashLink = to.includes("#");
    const isExactHash = isHashLink
      ? location.pathname === "/" && location.hash === to.slice(1)
      : isActive && (to !== "/" || location.hash === "");
    return `navbar-link${isExactHash ? " is-active" : ""}`;
  };

  const links = (
    <>
      {navLinks.map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          end={to === "/"}
          className={navClassName(to)}
          aria-label={
            label === "Cart" && totalCount > 0
              ? `Cart, ${totalCount} ${totalCount === 1 ? "item" : "items"}`
              : undefined
          }
          onClick={closeDrawer}
        >
          {label === "Cart" && (
            <span className="navbar-cart-icon" aria-hidden="true">
              <FiShoppingBag />
              <AnimatePresence mode="popLayout">
                {totalCount > 0 && (
                  <motion.span
                    key={totalCount}
                    className="navbar-badge"
                    initial={reduceMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={reduceMotion ? undefined : { scale: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 20 }
                    }
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          )}
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className={`navbar-shell${isScrolled ? " is-scrolled" : ""}`}>
      <div className="navbar container">
        <Link
          to="/"
          className="navbar-logo"
          aria-label="Burger Taste home"
          onClick={closeDrawer}
        >
          Burger Taste
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          {links}
        </nav>

        <div className="navbar-action">
          <CustomButton
            title="Order Now"
            onPress={() => navigate("/menu")}
            variant="primary"
          />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="navbar-toggle"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isDrawerOpen}
          aria-controls={drawerId}
          onClick={() => setOpenLocationKey(isDrawerOpen ? null : location.key)}
        >
          {isDrawerOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="navbar-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDrawer();
            }}
          >
            <motion.nav
              ref={drawerRef}
              id={drawerId}
              className="navbar-drawer"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 24 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {links}
              <CustomButton
                title="Order Now"
                onPress={() => {
                  closeDrawer();
                  navigate("/menu");
                }}
              />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
