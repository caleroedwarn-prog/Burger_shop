import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";
import type { product } from "../types/products";
import "../styles/productcard.css";

type ProductCardProps = {
  product: product;
  onPress: () => void;
  onAdd: () => void;
};

const ProductCard = memo(({ product, onPress, onAdd }: ProductCardProps) => {
  const reduceMotion = useReducedMotion();
  const [wasAdded, setWasAdded] = useState(false);
  const addTimeout = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (addTimeout.current !== null) window.clearTimeout(addTimeout.current);
    },
    [],
  );

  const handleAdd = () => {
    onAdd();
    setWasAdded(true);
    if (addTimeout.current !== null) window.clearTimeout(addTimeout.current);
    addTimeout.current = window.setTimeout(() => setWasAdded(false), 900);
  };

  return (
    <motion.article
      className="product-card"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <button
        type="button"
        className="product-card-main"
        aria-label={`${product.name}, ${formatPrice(product.price)}. View product details.`}
        onClick={onPress}
      >
        <div className="product-card-image">
          <img
            src={product.image}
            alt=""
            width="800"
            height="600"
            loading="lazy"
          />
        </div>
        <div className="product-card-content">
          <span className="product-card-category">{product.category}</span>
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-price">{formatPrice(product.price)}</p>
        </div>
      </button>
      <motion.button
        type="button"
        className="product-card-add"
        aria-label={
          wasAdded
            ? `${product.name} added to cart`
            : `Add ${product.name} to cart`
        }
        onClick={(event) => {
          event.stopPropagation();
          handleAdd();
        }}
        whileHover={reduceMotion ? undefined : { rotate: 90 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {wasAdded ? (
            <motion.span
              key="added"
              initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.5, opacity: 0 }}
              aria-hidden="true"
            >
              <FiCheck />
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.5, opacity: 0 }}
              aria-hidden="true"
            >
              <FiPlus />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.article>
  );
});

export default ProductCard;
