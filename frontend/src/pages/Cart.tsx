import UseCart from "../hooks/useCart";
import { CartItemRow } from "../components/CartItemRow";
import { Empty } from "../components/EmptyState";
import { CustomButton } from "../components/primaryButtons";
import { useNavigate } from "react-router-dom";

type CartItemData = {
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
    };
    quantity: number;
};

type UseCartResult = {
    items: CartItemData[];
    totalPrice: number;
    changeQuantity: (productId: string | number, quantity: number) => void;
    removeItem: (productId: string | number) => void;
};

function Cart() {
    const { items, totalPrice, changeQuantity, removeItem } = UseCart() as UseCartResult;
    const Navigate = useNavigate();

    if (!items || items.length === 0) {
        return <Empty message="Your Cart Empty" />;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <div className="Cart">
                {items.map((item) => (
                    <CartItemRow
                        key={item.product.id}
                        item={item}
                        onIncrease={() => changeQuantity(item.product.id, item.quantity + 1)}
                        onDecrease={() => changeQuantity(item.product.id, item.quantity - 1)}
                        onRemove={() => removeItem(item.product.id)}
                    />
                ))}
            </div>

            <div className="cart-footer">
                <p className="Cart-total-label">Total</p>
                <p className="Cart-total-price">{totalPrice}</p>
            </div>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <CustomButton 
            title="Checkout"
            onPress={() => Navigate("/checkout")}
            loading={false}
            disabled={false}
            />
        </div>
    );
}

export default Cart;