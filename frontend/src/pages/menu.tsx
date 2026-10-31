import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
import { Category } from "../components/CategoryChip";
import { ErrorMessage } from "../components/ErrorMessages";
import { ProductSkeleton } from "../components/Loader";
import Seo from "../components/Seo";
import { CustomButton } from "../components/primaryButtons";
import { useProductModal } from "../context/ProductModalContext";
import { fadeUp, stagger, viewportConfig } from "../animations";
import { formatPrice } from "../utils/formatPrice";
import "../styles/menu.css";

function Menu() {
  const { products, loading, error, refetch } = useProducts();
  const { addItem, totalCount, totalPrice } = useCart();
  const { openProduct, selectedProduct } = useProductModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const selectedCategory = searchParams.get("category") ?? "All";

  const categories = useMemo(() => {
    const list = ["All", ...new Set(products.map((item) => item.category))];
    if (
      selectedCategory !== "All" &&
      !list.some(
        (category) =>
          category.toLocaleLowerCase() ===
          selectedCategory.toLocaleLowerCase(),
      )
    ) {
      list.push(selectedCategory);
    }
    return list;
  }, [products, selectedCategory]);

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter(
            (item) =>
              item.category.toLocaleLowerCase() ===
              selectedCategory.toLocaleLowerCase(),
          ),
    [products, selectedCategory],
  );

  const selectCategory = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === "All") nextParams.delete("category");
    else nextParams.set("category", category);
    setSearchParams(nextParams);
  };

  return (
    <main className="menu-page">
      {!selectedProduct && (
        <Seo
          title="Our Menu"
          description="Explore the Burger Taste menu and find fresh burgers and sides made to order."
          image="/og-share-image.jpg"
          path="/menu"
        />
      )}
      <header className="menu-hero">
        <div className="container">
          <p>Made fresh when you order</p>
          <h1>Our Menu</h1>
          <p>Find your new favorite, made fresh and full of flavor.</p>
        </div>
      </header>

      <nav className="menu-category-bar" aria-label="Filter menu by category">
        <div className="container menu-category-row">
          {categories.map((category) => (
            <Category
              key={category}
              label={category}
              selected={
                selectedCategory.toLocaleLowerCase() ===
                category.toLocaleLowerCase()
              }
              onPress={() => selectCategory(category)}
            />
          ))}
        </div>
      </nav>

      <section className="container menu-results" aria-labelledby="menu-results-heading">
        <div className="menu-results-heading">
          <h2 id="menu-results-heading" className="visually-hidden">
            {selectedCategory === "All" ? "All burgers" : `${selectedCategory} burgers`}
          </h2>
          {!loading && error === "" && (
            <p aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "burger" : "burgers"}
            </p>
          )}
        </div>

        {loading && (
          <div className="menu-grid" aria-label="Loading menu">
            {Array.from({ length: 8 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
        {!loading && error !== "" && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}
        {!loading && error === "" && filtered.length === 0 && (
          <div className="menu-empty">
            <p>No burgers in this category just yet.</p>
            <CustomButton
              title="View all burgers"
              onPress={() => selectCategory("All")}
              variant="outline"
            />
          </div>
        )}
        {!loading && error === "" && filtered.length > 0 && (
          <motion.div
            className="menu-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {filtered.map((burger) => (
              <motion.div
                key={burger.id}
                variants={reduceMotion ? undefined : fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                <ProductCard
                  product={burger}
                  onPress={() => openProduct(burger)}
                  onAdd={() => addItem(burger)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {totalCount > 0 && (
          <motion.aside
            className="menu-cart-bar"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <span className="menu-cart-count">
              <FiShoppingCart aria-hidden="true" />
              {totalCount} {totalCount === 1 ? "item" : "items"}
            </span>
            <Link to="/cart">
              View cart - {formatPrice(totalPrice)}
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Menu;
