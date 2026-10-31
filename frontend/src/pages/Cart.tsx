import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CartItemRow } from "../components/CartItemRow";
import { Empty } from "../components/EmptyState";
import { CustomButton } from "../components/primaryButtons";
import Seo from "../components/Seo";
import useCart from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import "../styles/cart.css";

function Cart() {
  const { items, totalPrice, changeQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <main className="cart-page container">
      <Seo
        title="Your Cart"
        description="Review your Burger Taste order and continue to checkout."
        image="/og-share-image.jpg"
        path="/cart"
      />
      <header className="cart-page-heading">
        <p>Your order</p>
        <h1>Your Cart</h1>
      </header>

      {items.length === 0 ? (
        <Empty message="Your cart is empty." />
      ) : (
        <div className="cart-layout">
          <section className="cart-items-list" aria-label="Items in your cart">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0, x: -16, marginBottom: 0 }
                  }
                  transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
                >
                  <CartItemRow
                    item={{
                      product: {
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      },
                      quantity: item.quantity,
                    }}
                    productHref={`/product/${item.id}`}
                    onIncrease={() => changeQuantity(item.id, item.quantity + 1)}
                    onDecrease={() => changeQuantity(item.id, item.quantity - 1)}
                    onRemove={() => removeItem(item.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <CustomButton
              title="Checkout"
              onPress={() => navigate("/checkout")}
            />
            <Link className="cart-continue-link" to="/menu">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
