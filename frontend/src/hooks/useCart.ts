import { useContext } from "react";
import { CartContext } from "../context/cartContext";


const UseCart = () => {
    const context = useContext(CartContext)

    if(context === null) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
export default UseCart