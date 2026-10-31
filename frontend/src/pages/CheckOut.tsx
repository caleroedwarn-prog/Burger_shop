import type { OrderItem, OrderRequest } from "../types/order";
import { createOrder } from "../api/order";
import  UseCart  from "../hooks/useCart";
import { CustomButton } from "../components/primaryButtons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../components/FormField";
import Seo from "../components/Seo";
import { formatPrice } from "../utils/formatPrice";
import "../styles/checkout.css";


type FormErrors = {
  name?: string;
  phone?: string;
  address?: string;
};

function Checkout() {
  const { items, totalPrice, clearCart } = UseCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newError: FormErrors = {};

    if (name.trim() === "") {
      newError.name = "Name required";
    }

    if (phone.trim().length !== 9) {
      newError.phone = "Input a valid phone number";
    }

    if (address.trim() === "") {
      newError.address = "Address required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    setServerError('');
    if(!validate())return
    setSubmitting(true)

    const orderItems: OrderItem[] = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity
    }))

    const order: OrderRequest = {
      customerName: name,
      phone,
      address: address,
      items: orderItems
    }

    try {
      await createOrder(order);
      clearCart()
      navigate("/order-success")
  
    } catch {
      setServerError("Unable to place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="checkout-page container">
      <Seo
        title="Checkout"
        description="Enter your contact and delivery details to place your Burger Taste order."
        image="/og-share-image.jpg"
        path="/checkout"
      />
      <header className="checkout-heading">
        <p>Almost there</p>
        <h1>Checkout</h1>
      </header>

      <div className="checkout-layout">
        <section className="checkout-form-card" aria-label="Delivery details">
          <div className="checkout-form-section">
            <h2>Contact details</h2>
            <InputField
              label="Name"
              value={name}
              onChangeText={setName}
              error={error.name}
            />
            <InputField
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              error={error.phone}
              keyboardType="tel"
            />
          </div>

          <div className="checkout-form-section">
            <h2>Delivery address</h2>
            <InputField
              label="Address"
              value={address}
              onChangeText={setAddress}
              error={error.address}
            />
          </div>

          {serverError !== "" && (
            <p className="checkout-error" role="alert">
              {serverError}
            </p>
          )}

          <CustomButton
            title="Place Order"
            onPress={handleSubmit}
            loading={submitting}
            disabled={items.length === 0}
          />
          <p className="checkout-reassurance">
            We will contact you to confirm your order.
          </p>
          <Link className="checkout-back-link" to="/cart">
            Back to cart
          </Link>
        </section>

        <aside className="checkout-summary-card">
          <h2>Order summary</h2>
          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.id}>
                <img
                  src={item.image}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                />
                <span className="checkout-item-name">
                  {item.name} <span>× {item.quantity}</span>
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;