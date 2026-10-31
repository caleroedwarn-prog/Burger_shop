import { Link } from "react-router-dom";
import UseCart from "../hooks/useCart";
import { CustomButton } from "./primaryButtons";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const { totalCount } = UseCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Burger Taste
            </Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/cart" className="navbar-cart">
                Cart
                {totalCount > 0 && <span className="navbar-badge">{totalCount}</span>}
                </Link>
            </div>

            <div className="navbar-action">
                <CustomButton
                title="Order Now"
                onPress={() => navigate("/menu")}
                loading={false}
                disabled={false}
                />
            </div>
        </nav>
    )
}

export default Navbar