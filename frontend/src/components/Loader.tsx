import { memo } from "react";
import "../styles/loader.css";

export const LoadingView = memo(() => {
  return (
    <div
      className="loading-view"
      role="status"
      aria-label="Loading"
    >
      <span className="loading-spinner" aria-hidden="true" />
    </div>
  );
});

export const ProductSkeleton = memo(() => {
  return (
    <div
      className="product-skeleton"
      aria-hidden="true"
    >
      <span className="product-skeleton-image" />
      <span className="product-skeleton-category" />
      <span className="product-skeleton-title" />
      <span className="product-skeleton-price" />
    </div>
  );
});
