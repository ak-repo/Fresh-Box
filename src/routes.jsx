import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

//Proivder
import AuthProvider from "./ContextAPI/Auth/AuthProvider";
import ToastProvider from "./ContextAPI/ToastMessage/ToastProvider";
import CartProvider from "./ContextAPI/CartController/CartProvider";
import WishlistProvider from "./ContextAPI/WishListController/WishListProvider";
import OrderProvider from "./ContextAPI/OrderController/OrderProvider";

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
import UserProfile from "./pages/nonAuth/profile/UserProfile";
import AboutPage from "./pages/nonAuth/aboutUs/AboutUs";
import OrdersPage from "./pages/nonAuth/order/Orders";
import PaymentPage from "./pages/nonAuth/payment/PaymentPage";
import PaymentSuccess from "./pages/nonAuth/payment/PaymentSuccess";
import ScrollToTop from "./pages/common/scroll/ScrollTop";

export default function MainComponent() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <AppRouters />
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
// // in App.js
// <UserProvider>
//   <CartProvider>
//     <WishlistProvider>
//       <OrderProvider>
//         <NavigationBar />
//         <Routes />
//       </OrderProvider>
//     </WishlistProvider>
//   </CartProvider>
// </UserProvider>

const AppRouters = () => {
  const location = useLocation();
  const hideComponets =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <ScrollToTop />
      {!hideComponets && <NavigationBar />}
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
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>

      {!hideComponets && <Footer />}
    </>
  );
};
