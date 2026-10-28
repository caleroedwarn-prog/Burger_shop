import type { OrderItem, OrderRequest } from "../types/order";
import { createOrder } from "../api/order";
import  UseCart  from "../hooks/useCart";
import { CustomButton } from "../components/primaryButtons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { InputField } from "../components/FormField";



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

  const validate = useCallback(() => {
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
  }, [address, name, phone]);

  const handleSubmit = useCallback(async () => {
    setServerError('');
    if(!validate())return
    setSubmitting(true)

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))

    const order: OrderRequest = {
      customerName: name,
      phone: Number(phone),
      address: address,
      items: orderItems
    }

    try {
      await createOrder(order);
      clearCart()
      navigate("/orderSuccess")
  
    } catch {
      setServerError("Unable to place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [address, clearCart, items, name, navigate, phone, validate]);

  return (
    <div className="">
      <h1>Checkout</h1>
      <p className="checkout-summary">
        Order summary:{items.length} burger(s), total {totalPrice}
      </p>
        <InputField
      label="Name"
      value={name}
      onChangeText= {(text) => setName(text)}
      error={error.name}
       />

        <InputField
      label="Phone"
      value={phone}
      onChangeText= {(text) => setPhone(text)}
      error={error.phone}
      keyboardType="tel"
       />

        <InputField
      label="Address"
      value={address}
      onChangeText= {(text) => setAddress(text)}
      error={error.name}
       />

       {serverError !== "" && <p className="checkout-error">{serverError}</p>}

       <CustomButton
          title = "Address"
          onPress={handleSubmit}
          loading = {submitting}
          disabled={items.length === 0}
       />
    </div>
  )
}

export default Checkout;