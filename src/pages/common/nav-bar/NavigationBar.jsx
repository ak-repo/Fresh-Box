import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserDataContext } from "../../../API/AuthContext";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useContext(UserDataContext);

  return (
    <div className="bg-[var(--color-black)] text-white relative">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <NavLink to="/">
          <img
            src="assets/FRESH-BOX-logo.png"
            alt="Fresh-box logo"
            className="w-20"
          />
        </NavLink>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-6 relative">
          <NavLink to="/cart">
            <FiShoppingBag size={25} color="#a6a6a6" />
          </NavLink>
          <NavLink to="/wishlist">
            <MdFavorite size={25} color="#a6a6a6" />
          </NavLink>

          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <FaUserCircle size={25} color="#a6a6a6" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </NavLink>
                {!user ? (
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                ) : (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            About
          </NavLink>

          <div className="flex space-x-6 mt-4">
            <NavLink>
              <FiShoppingBag size={25} color="#a6a6a6" />
            </NavLink>
            <NavLink>
              <MdFavorite size={25} color="#a6a6a6" />
            </NavLink>
            <NavLink to="/login">
              <FaUserCircle size={25} color="#a6a6a6" />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
