import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./API/AuthProvider";

//Routes
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LandingPage from "./pages/nonAuth/landing/Landing";
import NavigationBar from "./pages/common/nav-bar/NavigationBar";
import ErrorResponse from "./pages/nonAuth/404/ErrorResponse";
import Products from "./pages/nonAuth/products/Products";
import ProductDetails from "./pages/nonAuth/products/ProductDetails";
import Cart from "./pages/nonAuth/cart/Cart";
import Wishlist from "./pages/nonAuth/wishlist/WishList";
import Footer from "./pages/common/footer/Footer";

export default function UserRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouters />
      </AuthProvider>
    </BrowserRouter>
  );
}
const AppRouters = () => {
  const location = useLocation();
  const hiddeNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hiddeNavbar && <NavigationBar />}
      <Routes>
        <Route path="*" element={<ErrorResponse />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/products" element={<Products />} />
        <Route
          path={`/productDetails/:productId`}
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {!hiddeNavbar && <Footer />}
    </>
  );
};
