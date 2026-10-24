import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { LoadingView } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessages";
import { CustomButton } from "../components/primaryButtons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/png-logo.png";
import "../styles/home.css";

function HomePage() {
    const { products, error, loading, refetch } = useProducts();
    const navigate = useNavigate();

    const featured = products.slice(0, 4);

    return (
        <div className="Home">
            <header className="logo-layer">
                <div className="logo">
                    <img src={logo} alt="good tasty best burger" />
                    <p>Burger Taste</p>
                </div>
            </header>
            <div className="banner">
                <h1>Welcome to Burger Taste</h1>
                <p>Fresh, hot, and made just for you</p>
                <CustomButton
                    title="Order Now"
                    onPress={() => navigate("/menu")}
                    loading={false}
                    disabled={false}
                />
            </div>
            
            <h2>Featured</h2>

            { loading === true && <LoadingView /> }
            { loading === false && error !== "" && (
                <ErrorMessage message={error} onRetry={refetch} />
            ) } 

            <div className="featured-grid">
                {featured.map((burger) => (
                    <ProductCard
                        key={burger.id}
                        product={burger}
                        onPress={() => navigate("/product/" + burger.id)}
                        onAdd={() => {}}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
