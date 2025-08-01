import { createContext } from "react";
import { useContext } from "react";

// create Contexts
export const UserDataContext = createContext();
export const ToastContext = createContext();
export const ProductContext = createContext();
export const CartContext = createContext();
export const WishListContext = createContext();
export const OrderContext = createContext();

//convert context into custom hooks
export const useUser = () => useContext(UserDataContext);
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishListContext);
export const useToast = () => useContext(ToastContext);
export const useOrder = () => useContext(OrderContext);
