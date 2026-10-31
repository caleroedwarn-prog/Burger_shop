import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Menu from "./pages/menu";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/Product";
import Checkout from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";




function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </>
  )
}

export default App
