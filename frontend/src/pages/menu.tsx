import useProducts from "../hooks/useProducts";
import UseCart from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
import { Category } from "../components/CategoryChip";
import { LoadingView } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessages";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

function Menu() {
  const { products, loading, error, refetch } = useProducts();
  const navigate = useNavigate();
  const cart = UseCart() as { addItem: (item: unknown) => void };
  const { addItem } = cart;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list: string[] = ["All"];
    products.forEach((burger) => {
      if (list.includes(burger.category) === false) {
        list.push(burger.category);
      }
    });
    return list;
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All"){
        return products;
    }
    return products.filter((burger) => burger.category === selectedCategory);
 }, [products, selectedCategory])

 return (
    <div className="menu">
        <h1>Our Menu</h1>
        {loading === true && <LoadingView />}
        {loading === false && error !== "" && (
            <ErrorMessage message={error} onRetry={refetch} />
        )}
        {loading === false && error === "" && (
            <div>
                <div className="category-row">
                    {categories.map((category) => (
                        <Category 
                        key={category}
                        label={category}
                        selected={category === selectedCategory}
                        onPress={() => setSelectedCategory(category)}
                        />
                    ))}
                   </div>
                    {filtered.length === 0 && <p>No burgers in this category.</p>}
                    <div className="Menu-grid">
                    {filtered.map((burger) => (
                        <ProductCard
                        key={burger.id}
                        product={burger}
                        onPress={() => navigate("/product/" + burger.id)}
                        onAdd={() => addItem(burger)}
                        />
                    ))}
                </div>
            </div>
        )}
    </div>
 )
}

export default Menu;