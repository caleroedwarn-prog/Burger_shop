import UseCart from "../hooks/useCart";
import { CartItemRow } from "../components/CartItemRow";
import { Empty } from "../components/EmptyState";
import { CustomButton } from "../components/primaryButtons";
import { useNavigate } from "react-router-dom";

type CartItemData = {
    id?: number;
    product?: {
        id: number;
        name: string;
        image: string;
        price: number;
    };
    name?: string;
    image?: string;
    price?: number;
    quantity: number;
};

type UseCartResult = {
    items: CartItemData[];
    totalPrice: number;
    changeQuantity: (productId: string | number, quantity: number) => void;
    removeItem: (productId: string | number) => void;
};

function Cart() {
    const { items = [], totalPrice, changeQuantity, removeItem } = UseCart() as unknown as UseCartResult;
    const Navigate = useNavigate();

    const normalizedItems = items.map((item) => {
        const product = item.product ?? {
            id: item.id ?? 0,
            name: item.name ?? "Product",
            image: item.image ?? "",
            price: item.price ?? 0,
        };

        return {
            ...item,
            product,
        };
    });

    if (!normalizedItems || normalizedItems.length === 0) {
        return <Empty message="Your Cart Empty" />;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <div className="Cart">
                {normalizedItems.map((item) => {
                    const productId = item.product?.id ?? item.id ?? 0;

                    return (
                        <CartItemRow
                            key={productId}
                            item={item}
                            onIncrease={() => changeQuantity(productId, item.quantity + 1)}
                            onDecrease={() => changeQuantity(productId, item.quantity - 1)}
                            onRemove={() => removeItem(productId)}
                        />
                    );
                })}
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