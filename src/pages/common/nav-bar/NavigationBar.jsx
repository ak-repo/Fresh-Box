import { useContext,  useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserDataContext } from "../../../ContextAPI/ContextsCreate";
import { useCartController } from "../../../customHooks/useCartController";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useContext(UserDataContext);
  const {  totalQuantity } = useCartController();

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img
              src="assets/FRESH-BOX-logo.png"
              alt="Fresh-box logo"
              className="w-24 hover:opacity-90 transition-opacity"
            />
          </NavLink>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-gray-900"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-gray-900"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/aboutUs"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-gray-900"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-800 relative transition-colors"
            >
              <FiShoppingBag
                size={22}
                className="text-gray-300 hover:text-white"
              />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </NavLink>

            <NavLink
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <MdFavorite
                size={22}
                className="text-gray-300 hover:text-white"
              />
            </NavLink>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <FaUserCircle
                  size={22}
                  className="text-gray-300 hover:text-white"
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl z-10 overflow-hidden">
                  <div className="border-t border-gray-200">
                    {!user ? (
                      <NavLink
                        to="/login"
                        className="block px-4 py-3 hover:bg-gray-100 text-sm font-medium transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Login
                      </NavLink>
                    ) : (
                      <>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-3 hover:bg-gray-100 text-sm font-medium transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </NavLink>
                        <NavLink
                          to="/orders"
                          className="block px-4 py-3 hover:bg-gray-100 text-sm font-medium transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </NavLink>
                        <button
                          className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium transition-colors"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-3 space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
          >
            Products
          </NavLink>
          <NavLink
            to="/aboutUs"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
          >
            About
          </NavLink>

          <div className="flex space-x-4 pt-3 border-t border-gray-800 mt-3">
            <NavLink
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-800 relative"
              onClick={() => setIsOpen(false)}
            >
              <FiShoppingBag size={22} className="text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </NavLink>
            <NavLink
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <MdFavorite size={22} className="text-gray-300" />
            </NavLink>
            <NavLink
              to={user ? "/profile" : "/login"}
              className="p-2 rounded-full hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle size={22} className="text-gray-300" />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
