import type { product } from "../types/products";
import { memo } from "react";
import { color } from "../constants/colors";

type ProductCardProps = {
    product: product;
    onPress: () => void;
    onAdd: () => void;
}

export const ProductCard = memo(( { product, onPress, onAdd }: ProductCardProps) => {
    return (
        <>
        <div 
            onClick={onPress}
            style={{
                backgroundColor: color.card,
                borderRadius: "12px",
                padding: "12px",
                cursor: "pointer"
            }}>
                <img 
                  src = { product.image.toString()}
                  alt = { product.name }
                  style={{
                    width: "100%",
                    height: "150%",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }} />

                  <h3 style={{ fontWeight: "bold" }}>
                    {product.name}
                  </h3>

                  <p>{product.price}</p>

                  <button onClick={(event) => { 
                    event.stopPropagation();
                    onAdd();
                  }} 
                  style={{
                    backgroundColor: color.primary,
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer"
                  }}
                  >Add</button>
            </div>
        </>
    );
});