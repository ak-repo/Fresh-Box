import { useEffect, useState } from "react";
import axios from "axios";

import { useUser, useToast } from "../ContextCreater&Hook";
import { CartContext } from "../ContextCreater&Hook";

const BASE_API = "http://localhost:3000/users";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setQuantity] = useState(0);
  const { user } = useUser();
  const { toastSuccess } = useToast();

  //fatching cart items..
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${BASE_API}?id=${user.id}`)
        .then((res) => {
          const userData = res.data[0];
          setCart(userData?.cart || []);
        })
        .catch((error) => console.log("cart fetch error", error));
    }
  }, [user?.id]);

  //updating Quantity of cart
  useEffect(() => {
    if (cart) {
      setQuantity(cart.length);
    }
  }, [cart]);

  // patching functionality

  const updateCartOnServer = async (updatedCart) => {
    if (user.id) {
      await axios
        .patch(`${BASE_API}/${user.id}`, { cart: updatedCart })
        .then(() => {
          setCart(updatedCart);
        })
        .catch((err) => console.log("Error updating Cart", err));
    }
  };

  //add to cart
  const addToCart = (product) => {
    if (!user?.id) {
      toastSuccess("⚠️ Login Required");
      return;
    }

    const existing = cart.find((item) => item?.id === product.id);

    if (existing) {
      toastSuccess("🛒 Already in Cart!");
    } else {
      const newCart = [
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,

          quantity: 1,
        },
      ];
      updateCartOnServer(newCart);
      toastSuccess("🛒 Added to cart! Ready to checkout when you are.");
    }
  };

  //remove from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    updateCartOnServer(newCart);
    toastSuccess("❌ Removed from cart. Maybe next time!");
  };

  //update cart quantity
  const updateQuantity = (productId, newQuanty) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + newQuanty }
        : item
    );
    updateCartOnServer(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
