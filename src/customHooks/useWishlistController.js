import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../API/AuthContext";

const BASE_API = "http://localhost:3000/users";
export function useWishlistController() {
  const { user } = useContext(UserDataContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${BASE_API}?id=${user.id}`)
        .then((res) => {
          const userData = res.data[0];
          setWishlist(userData?.wishlist || []);
        })
        .catch((err) => console.error("Wishlist Fetch Error:", err));
    }
  }, [user?.id]);

  const updateWishlistOnServer = async (updatedWishlist) => {
    if (user?.id) {
      await axios
        .patch(`${BASE_API}/${user.id}`, { wishlist: updatedWishlist })
        .then(() => setWishlist(updatedWishlist))
        .catch((err) => console.log("Error updating Wishlist", err));
    }
  };

  // add to wishlist
  const addtoWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      const newWishlist = [...wishlist, product];
      updateWishlistOnServer(newWishlist);
    }
  };
  //
  const removeFromWishlist = (productID) => {
    const newWishlist = wishlist.filter((item) => item.id !== productID);
    updateWishlistOnServer(newWishlist);
  };
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return { wishlist, addtoWishlist, removeFromWishlist, isInWishlist };
}
