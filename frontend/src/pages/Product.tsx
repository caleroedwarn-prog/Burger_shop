import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../components/primaryButtons";
import { ErrorMessage } from "../components/ErrorMessages";
import { LoadingView } from "../components/Loader";
import UseCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const { product, loading, error, refetch } = useProduct(productId);
    const { addItem } = UseCart() ;
    const navigate = useNavigate();
    const productDetails = product[0];
    

    if (loading) {
        return <LoadingView />;
    }

    if (error !== "") {
        return <ErrorMessage message={error} onRetry={refetch} />;
    }

    if (!productDetails) {
        return <ErrorMessage message="Burger not found" onRetry={refetch} />;
    }

    return (
        <div className="Product-details">
            <img src={productDetails.image} alt={productDetails.name} />
            <h1>{productDetails.name}</h1>
            <p className="product-description">{productDetails.descripton}</p>
            <p>${productDetails.price.toFixed(2)}</p>
            <CustomButton
                title="Add to cart"
                onPress={() => {
                    addItem(productDetails); 
                    navigate(-1)
                }}
            />
            <CustomButton
                title="Back to menu"
                onPress={() => navigate("/menu")}
            />
        </div>
    );
}

export default ProductDetails;
