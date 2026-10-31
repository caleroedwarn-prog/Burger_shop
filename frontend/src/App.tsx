import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Menu from "./pages/menu";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/Product";
import Checkout from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import PlatformsStrip from "./components/PlatformsStrip";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";

function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <PlatformsStrip />
      <Footer />
    </div>
  )
}

export default App
