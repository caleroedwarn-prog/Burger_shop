import { memo } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";
import type { CartItem } from "../types/cart";
import { Link } from "react-router-dom";
import "../styles/cartItemRow.css";

type CartItemRowProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  productHref?: string;
};

export const CartItemRow = memo(
  ({ item, onIncrease, onDecrease, onRemove, productHref }: CartItemRowProps) => (
    <article className="cart-item-row">
      <img
        className="cart-item-image"
        src={item.product.image}
        alt={item.product.name}
        width={72}
        height={72}
        loading="lazy"
      />

      <div className="cart-item-information">
        <h2 className="cart-item-name">
          {productHref ? (
            <Link to={productHref}>{item.product.name}</Link>
          ) : (
            item.product.name
          )}
        </h2>
        <p className="cart-item-unit-price">{formatPrice(item.product.price)} each</p>
      </div>

      <div
        className="cart-item-quantity"
        role="group"
        aria-label={`${item.product.name} quantity`}
      >
        <button
          type="button"
          className="cart-quantity-button"
          aria-label={`Decrease ${item.product.name} quantity`}
          onClick={onDecrease}
        >
          <FiMinus aria-hidden="true" />
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          className="cart-quantity-button"
          aria-label={`Increase ${item.product.name} quantity`}
          onClick={onIncrease}
        >
          <FiPlus aria-hidden="true" />
        </button>
      </div>

      <p className="cart-item-subtotal">
        {formatPrice(item.product.price * item.quantity)}
      </p>

      <button
        type="button"
        className="cart-item-remove"
        aria-label={`Remove ${item.product.name} from cart`}
        onClick={onRemove}
      >
        <FiTrash2 aria-hidden="true" />
      </button>
    </article>
  ),
);
