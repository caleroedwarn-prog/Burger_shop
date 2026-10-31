import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../components/primaryButtons";
import { ErrorMessage } from "../components/ErrorMessages";
import { LoadingView } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import { useProductModal } from "../context/ProductModalContext";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
import useProducts from "../hooks/useProducts";
import { formatPrice } from "../utils/formatPrice";
import "../styles/product.css";

function isProduct(value: unknown): value is import("../types/products").product {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    typeof candidate.image === "string" &&
    typeof candidate.category === "string"
  );
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product, loading, error, refetch } = useProduct(productId);
  const { products } = useProducts();
  const { addItem } = useCart();
  const { openProduct, selectedProduct } = useProductModal();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const rawProduct: unknown = product;
  const productDetails = Array.isArray(rawProduct)
    ? rawProduct.find(isProduct)
    : isProduct(rawProduct)
      ? rawProduct
      : undefined;

  if (loading) {
    return (
      <main className="product-page container">
        <Seo
          title={`Product ${id}`}
          description={`Loading details for Burger Taste product ${id}. Product information will appear shortly.`}
          image="/og-share-image.jpg"
          path={`/product/${id}`}
        />
        <h1 className="visually-hidden">Loading product details</h1>
        <LoadingView />
      </main>
    );
  }

  if (error !== "") {
    return (
      <main className="product-page container">
        <Seo
          title={`Product ${id} unavailable`}
          description={`Product details for item ${id} are currently unavailable. Please try again or return to the menu.`}
          image="/og-share-image.jpg"
          path={`/product/${id}`}
        />
        <h1 className="visually-hidden">Product details unavailable</h1>
        <ErrorMessage message={error} onRetry={refetch} />
      </main>
    );
  }

  if (!productDetails) {
    return (
      <main className="product-page container">
        <Seo
          title={`Product ${id} not found`}
          description={`Product ${id} could not be found in the Burger Taste menu.`}
          image="/og-share-image.jpg"
          path={`/product/${id}`}
        />
        <h1 className="visually-hidden">Product not found</h1>
        <ErrorMessage message="Burger not found" onRetry={refetch} />
      </main>
    );
  }

  const description = productDetails.descripton ?? "";
  const seoDescription =
    description.length > 155
      ? `${description.slice(0, 152).trimEnd()}...`
      : description;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productDetails.name,
    image: new URL(productDetails.image, window.location.origin).toString(),
    description,
    category: productDetails.category,
    brand: { "@type": "Brand", name: "Burger Taste" },
    offers: {
      "@type": "Offer",
      price: productDetails.price,
      priceCurrency: "XAF",
      availability: "https://schema.org/InStock",
    },
  };
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === productDetails.category &&
        item.id !== productDetails.id,
    )
    .slice(0, 4);

  return (
    <main className="product-page container">
      {!selectedProduct && (
        <Seo
          title={productDetails.name}
          description={seoDescription}
          image={productDetails.image}
          path={`/product/${productDetails.id}`}
          jsonLd={productJsonLd}
        />
      )}
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/menu">Menu</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{productDetails.name}</span>
      </nav>

      <section className="product-detail-layout" aria-labelledby="product-heading">
        <div className="product-detail-image">
          <img
            src={productDetails.image}
            alt={`${productDetails.name} - ${productDetails.category} burger`}
            width="900"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="product-detail-info">
          <span className="product-detail-category">{productDetails.category}</span>
          <h1 id="product-heading">{productDetails.name}</h1>
          <p className="product-detail-description">{description}</p>
          <p className="product-detail-price">{formatPrice(productDetails.price)}</p>
          <div
            className="product-detail-quantity"
            role="group"
            aria-label="Quantity"
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1 || added}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              −
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={added}
              onClick={() => setQuantity((current) => current + 1)}
            >
              +
            </button>
          </div>
          <CustomButton
            title={added ? "Added ✓" : "Add to cart"}
            disabled={added}
            onPress={() => {
              for (let index = 0; index < quantity; index += 1) {
                addItem(productDetails);
              }
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1200);
            }}
          />
          <button
            type="button"
            className="product-back-button"
            onClick={() => navigate("/menu")}
          >
            Back to menu
          </button>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="product-related" aria-labelledby="related-heading">
          <h2 id="related-heading">Related burgers</h2>
          <div className="product-related-grid">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onPress={() => openProduct(item)}
                onAdd={() => addItem(item)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;
