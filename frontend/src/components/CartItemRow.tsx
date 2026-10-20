import type { CartItem } from "../types/cart";
import { memo } from "react";
import { color } from "../constants/colors";

type cartItemProps = {
    item: CartItem;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

export const cartItem = memo(({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: cartItemProps)  => {
    return (
        <div className="Cart_Item_box">
        <div className="product_Image">
            <img className="source" src={item.product.image} alt={item.product.name} />
        </div>

        <div className="product_information">
            <p className="product_name">
                {item.product.name}
            </p>

            <p className="product_price">
                {item.product.price}
            </p>
        </div>

        <div className="product_control">
            <button onClick={onDecrease}>-</button>
            <span>{item.quantity}</span>
            <button onClick={onIncrease}>+</button>

            <button onClick={onRemove}>T</button>
           </div>
        </div>
    )
});