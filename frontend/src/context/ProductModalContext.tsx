import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { RefObject } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProduct, getProducts } from "../api/product";
import { fadeUp, stagger } from "../animations";
import { formatPrice } from "../utils/formatPrice";
import type { product } from "../types/products";
import useCart from "../hooks/useCart";
import Seo from "../components/Seo";
import "../styles/productModal.css";

type ProductModalContextValue = {
  selectedProduct: product | null;
  openProduct: (item: product) => void;
  closeProduct: () => void;
  products: product[];
  openerRef: RefObject<HTMLElement | null>;
};

const ProductModalContext = createContext<ProductModalContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useProductModal() {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error("useProductModal must be used within ProductModalProvider");
  }
  return context;
}

function ProductModal() {
  const { selectedProduct, openerRef } = useProductModal();
  return (
    <AnimatePresence>
      {selectedProduct && (
        <ProductDialog
          selectedProduct={selectedProduct}
          openerRef={openerRef}
        />
      )}
    </AnimatePresence>
  );
}

function ProductDialog({
  selectedProduct,
  openerRef,
}: {
  selectedProduct: product;
  openerRef: RefObject<HTMLElement | null>;
}) {
  const { closeProduct, openProduct, products } = useProductModal();
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [quantityState, setQuantityState] = useState({
    productId: selectedProduct.id,
    value: 1,
  });
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const selectedProductId = selectedProduct.id;
  const quantity =
    quantityState.productId === selectedProductId ? quantityState.value : 1;
  const added = addedProductId === selectedProductId;
  // Client-rendered metadata has limited SEO reach; pre-rendering or Next.js is the long-term fix.

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProduct();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialogRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === dialogRef.current)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [closeProduct, openerRef]);

  useEffect(() => {
    if (!added) return;
    const closeTimer = window.setTimeout(closeProduct, 1800);
    return () => window.clearTimeout(closeTimer);
  }, [added, closeProduct]);

  const productDescription = selectedProduct?.descripton ?? "";
  const seoDescription =
    productDescription.length > 155
      ? `${productDescription.slice(0, 152).trimEnd()}...`
      : productDescription;
  const productJsonLd = selectedProduct
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: selectedProduct.name,
        image: new URL(selectedProduct.image, window.location.origin).toString(),
        description: productDescription,
        category: selectedProduct.category,
        brand: { "@type": "Brand", name: "Burger Taste" },
        offers: {
          "@type": "Offer",
          price: selectedProduct.price,
          priceCurrency: "XAF",
          availability: "https://schema.org/InStock",
        },
      }
    : undefined;

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === selectedProduct.category &&
        item.id !== selectedProduct.id,
    )
    .slice(0, 3);

  return (
    <>
      <motion.div
        className="product-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.2 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeProduct();
        }}
      >
        <Seo
          title={selectedProduct.name}
          description={seoDescription}
          image={selectedProduct.image}
          path={`/product/${selectedProduct.id}`}
          jsonLd={productJsonLd}
        />
        <motion.div
          ref={dialogRef}
          className="product-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          tabIndex={-1}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 8 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.98, y: 8 }
          }
          transition={
            reduceMotion
              ? { duration: 0.12 }
              : { type: "spring", stiffness: 280, damping: 28 }
          }
        >
          <div className="product-modal-handle" aria-hidden="true" />
          <button
            type="button"
            className="product-modal-close"
            aria-label="Close product details"
            onClick={closeProduct}
          >
            <FiX aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedProduct.id}
              className="product-modal-content"
              variants={reduceMotion ? undefined : stagger}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ staggerChildren: reduceMotion ? 0 : 0.06 }}
            >
              <motion.div
                className="product-modal-image"
                variants={reduceMotion ? undefined : fadeUp}
              >
                <img
                  src={selectedProduct.image}
                  alt={`${selectedProduct.name} - ${selectedProduct.category} burger`}
                  width="720"
                  height="560"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                className="product-modal-details"
                variants={reduceMotion ? undefined : fadeUp}
              >
                <span className="product-modal-category">
                  {selectedProduct.category}
                </span>
                <h2 id="product-modal-title">{selectedProduct.name}</h2>
                <p className="product-modal-description">
                  {productDescription}
                </p>
                <p className="product-modal-price">
                  {formatPrice(selectedProduct.price)}
                </p>

                <div
                  className="product-modal-quantity"
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1 || added}
                    onClick={() =>
                      setQuantityState({
                        productId: selectedProduct.id,
                        value: Math.max(1, quantity - 1),
                      })
                    }
                  >
                    <FiMinus aria-hidden="true" />
                  </button>
                  <span aria-live="polite">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={added}
                    onClick={() =>
                      setQuantityState({
                        productId: selectedProduct.id,
                        value: quantity + 1,
                      })
                    }
                  >
                    <FiPlus aria-hidden="true" />
                  </button>
                </div>

                <motion.button
                  type="button"
                  className="product-modal-add"
                  disabled={added}
                  whileHover={reduceMotion || added ? undefined : { y: -1 }}
                  whileTap={reduceMotion || added ? undefined : { scale: 0.98 }}
                  onClick={() => {
                    for (let index = 0; index < quantity; index += 1) {
                      addItem(selectedProduct);
                    }
                    setAddedProductId(selectedProduct.id);
                  }}
                >
                  {added
                    ? "Added ✓"
                    : `Add to Cart - ${formatPrice(selectedProduct.price * quantity)}`}
                </motion.button>

                <Link
                  className="product-modal-full-link"
                  to={`/product/${selectedProduct.id}`}
                >
                  View full page
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {relatedProducts.length > 0 && (
            <section
              className="product-modal-related"
              aria-labelledby="product-modal-related-title"
            >
              <h3 id="product-modal-related-title">You might also like</h3>
              <div className="product-modal-related-grid">
                {relatedProducts.map((item) => (
                  <button
                    type="button"
                    className="product-modal-related-item"
                    key={item.id}
                    onClick={() => openProduct(item)}
                  >
                    <img
                      src={item.image}
                      alt=""
                      width="96"
                      height="72"
                      loading="lazy"
                    />
                    <span>{item.name}</span>
                    <span>{formatPrice(item.price)}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<product[]>([]);
  const openerRef = useRef<HTMLElement | null>(null);
  const itemId = new URLSearchParams(location.search).get("item");
  const selectedProduct =
    itemId === null
      ? null
      : products.find((item) => item.id === Number(itemId)) ?? null;

  useEffect(() => {
    let active = true;
    getProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch((error: unknown) => {
        console.error("Failed to load products for product recommendations", error);
        if (active) setProducts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const id = Number(itemId);
    if (!Number.isInteger(id) || id < 1) {
      return;
    }

    const cachedProduct = products.find((item) => item.id === id);
    if (cachedProduct) {
      return;
    }

    let active = true;
    getProduct(id)
      .then((item) => {
        if (active) {
          setProducts((current) =>
            current.some((existing) => existing.id === item.id)
              ? current
              : [...current, item],
          );
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load the requested product", error);
      });

    return () => {
      active = false;
    };
  }, [itemId, products]);

  const openProduct = useCallback(
    (item: product) => {
      if (!selectedProduct) {
        openerRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
      }
      setProducts((current) =>
        current.some((existing) => existing.id === item.id)
          ? current
          : [...current, item],
      );
      const search = new URLSearchParams(location.search);
      search.set("item", String(item.id));
      navigate(
        { pathname: location.pathname, search: search.toString(), hash: location.hash },
        { state: location.state },
      );
    },
    [
      location.hash,
      location.pathname,
      location.search,
      location.state,
      navigate,
      selectedProduct,
    ],
  );

  const closeProduct = useCallback(() => {
    if (!itemId) {
      return;
    }

    const search = new URLSearchParams(location.search);
    search.delete("item");
    navigate(
      {
        pathname: location.pathname,
        search: search.toString(),
        hash: location.hash,
      },
      { replace: true, state: location.state },
    );
  }, [itemId, location.hash, location.pathname, location.search, location.state, navigate]);

  const contextValue = useMemo(
    () => ({ selectedProduct, openProduct, closeProduct, products, openerRef }),
    [closeProduct, openProduct, openerRef, products, selectedProduct],
  );

  return (
    <ProductModalContext.Provider value={contextValue}>
      {children}
      <ProductModal />
    </ProductModalContext.Provider>
  );
}
