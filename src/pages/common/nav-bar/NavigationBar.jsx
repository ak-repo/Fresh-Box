import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  useUser,
  useCart,
  useWishlist,
} from "../../../ContextAPI/ContextCreater&Hook";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const { totalQuantity } = useCart();
  const { totalWishlistCount } = useWishlist();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            {/* <img
              src="assets/FRESH-BOX-logo.png"
              alt="Fresh-box logo"
              className="h-10 hover:opacity-90 transition-opacity"
            /> */}
            <NavLink to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-white flex items-baseline">
                <span>FRESH</span>
                <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-500 text-white rounded text-lg">
                  BOX
                </span>
              </h1>
            </NavLink>
          </NavLink>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-emerald-500 bg-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-emerald-500 bg-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/aboutUs"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-emerald-500 bg-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-800 transition-all relative group"
            >
              <MdFavorite
                size={20}
                className="text-gray-300 group-hover:text-white transition-colors"
              />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">
                {user ? totalWishlistCount : 0}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-800 transition-all relative group"
            >
              <FiShoppingBag
                size={20}
                className="text-gray-300 group-hover:text-white transition-colors"
              />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">
                {user ? totalQuantity : 0}
              </span>
            </NavLink>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-800 transition-all group"
              >
                <FaUserCircle
                  size={20}
                  className="text-gray-300 group-hover:text-white transition-colors"
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200">
                  <div className="py-1">
                    {!user ? (
                      <NavLink
                        to="/login"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-emerald-500 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Login
                      </NavLink>
                    ) : (
                      <>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-emerald-500 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </NavLink>
                        <NavLink
                          to="/orders"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-emerald-500 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </NavLink>
                        <button
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-emerald-500 transition-colors"
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
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-4">
              <NavLink
                to="/wishlist"
                className="p-2 rounded-full hover:bg-gray-800 relative"
                onClick={() => setIsOpen(false)}
              >
                <MdFavorite size={20} className="text-gray-300" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">
                  0
                </span>
              </NavLink>
              <NavLink
                to="/cart"
                className="p-2 rounded-full hover:bg-gray-800 relative"
                onClick={() => setIsOpen(false)}
              >
                <FiShoppingBag size={20} className="text-gray-300" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">
                  {totalQuantity}
                </span>
              </NavLink>
              <NavLink
                to={user ? "/profile" : "/login"}
                className="p-2 rounded-full hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle size={20} className="text-gray-300" />
              </NavLink>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    My Orders
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
