import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../ContextAPI/ContextsCreate";
import { ToastContext } from "../ContextAPI/ContextsCreate";

const BASE_API = "http://localhost:3000/users";
export function useWishlistController() {
  const { user } = useContext(UserDataContext);
  const [wishlist, setWishlist] = useState([]);
  const { toastSuccess } = useContext(ToastContext);

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
    if (!user?.id) {
      toastSuccess("⚠️ Login Required");
      return;
    }
    if (!wishlist.find((item) => item.id === product.id)) {
      const newWishlist = [...wishlist, product];
      updateWishlistOnServer(newWishlist);
      toastSuccess("💖 Saved to your wishlist. Come back anytime!");
    }
  };
  //
  const removeFromWishlist = (productID) => {
    const newWishlist = wishlist.filter((item) => item.id !== productID);
    updateWishlistOnServer(newWishlist);
    toastSuccess("💔 Removed from your wishlist. Hope you find better! ");
  };
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return { wishlist, addtoWishlist, removeFromWishlist, isInWishlist };
}
