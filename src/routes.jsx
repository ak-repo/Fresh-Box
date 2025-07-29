import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useUser } from "./ContextAPI/ContextCreater&Hook";

// Customer Providers
import AuthProvider from "./ContextAPI/Auth/AuthProvider";
import ToastProvider from "./ContextAPI/ToastMessage/ToastProvider";
import CartProvider from "./ContextAPI/CartController/CartProvider";
import WishlistProvider from "./ContextAPI/WishListController/WishListProvider";
import OrderProvider from "./ContextAPI/OrderController/OrderProvider";

// Customer Routes
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
import EditProfile from "./pages/nonAuth/profile/EditProfile";

// Admin Components
import AdminDashBord from "./admin/AdminPages/dashbord/AdminDashBord";
import AdminProductPage from "./admin/AdminPages/AdminProducts/AdminProductPage";
import AdminUserPage from "./admin/AdminPages/AdminUsers/AdminUserPage";
import AdminOrderPage from "./admin/AdminPages/AdminOrder/AdminOrderPage";
import AdminAnalyticsPage from "./admin/AdminPages/AdminAnalitics/AdminAnalyticsPage";
import AdminRevenuePage from "./admin/AdminPages/AdminRevenue/AdminRevenuePage";
import AdminCategoriesPage from "./admin/AdminPages/AdminCategory/AdminCategoriesPage";
import AdminSettingsPage from "./admin/AdminPages/AdminSettingsPage/AdminSettingsPage";
import AdminLayout from "./admin/adminControlls/AdminLayout"; // it controlls the providers

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

const AppRouters = () => {
  const location = useLocation();
  const hideComponents =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!hideComponents && <NavigationBar />}
      <Routes>
        <Route path="*" element={<ErrorResponse />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/editProfile" element={<EditProfile />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRouteController>
              <AdminLayout />
            </AdminRouteController>
          }
        >
          <Route index element={<AdminDashBord />} />
          <Route path="productsControls" element={<AdminProductPage />} />
          <Route path="ordersControls" element={<AdminOrderPage />} />
          <Route path="userControls" element={<AdminUserPage />} />
          <Route path="revenueControls" element={<AdminRevenuePage />} />
          <Route path="analyticsControls" element={<AdminAnalyticsPage />} />
          <Route path="categoriesControls" element={<AdminCategoriesPage />} />
          <Route path="adminSettings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>

      {!hideComponents && <Footer />}
    </>
  );
};

const AdminRouteController = ({ children }) => {
  const { user } = useUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};
