import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./API/AuthProvider";

//Routes
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LandingPage from "./pages/nonAuth/landing/Landing";
import NavigationBar from "./pages/common/nav-bar/NavigationBar";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
};
