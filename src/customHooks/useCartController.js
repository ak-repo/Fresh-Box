import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../API/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_API = "http://localhost:3000/users";

export function useCartController() {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

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

  // patching functionality

  const updateCartOnServer = async (updatedCart) => {
    if (user.id) {
      console.log(" updater");

      await axios
        .patch(`${BASE_API}/${user.id}`, { cart: updatedCart })
        .then(() => setCart(updatedCart))
        .catch((err) => console.log("Error updating Cart", err));
    }
  };

  //add to cart
  const addToCart = (product) => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    const existing = cart.find((item) => item?.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) => {
        return item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      console.log(updatedCart, "new one geted");
      updateCartOnServer(updatedCart);
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
    }
  };

  //remove from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    updateCartOnServer(newCart);
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

  return { cart, addToCart, removeFromCart, updateQuantity };
}
