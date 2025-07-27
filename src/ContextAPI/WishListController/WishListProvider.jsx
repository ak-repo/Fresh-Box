import axios from "axios";
import { useEffect, useState } from "react";

import { useUser, useToast } from "../ContextCreater&Hook";
import { WishListContext } from "../ContextCreater&Hook";
import { usersAPI } from "../../api";

export default function WishlistProvider({ children }) {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const { toastSuccess } = useToast();
  const [totalWishlistCount, setWishCount] = useState(0);

  //fetching wishlist
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${usersAPI}?id=${user.id}`)
        .then((res) => {
          const userData = res.data[0];
          setWishlist(userData?.wishlist || []);
        })
        .catch((err) => console.error("Wishlist Fetch Error:", err));
    }
  }, [user?.id]);

  useEffect(() => {
    setWishCount(wishlist.length);
  }, [wishlist]);

  //updating function
  const updateWishlistOnServer = async (updatedWishlist) => {
    if (user?.id) {
      await axios
        .patch(`${usersAPI}/${user.id}`, { wishlist: updatedWishlist })
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
      const newWishlist = [
        ...wishlist,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      ];
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

  return (
    <WishListContext.Provider
      value={{ wishlist, addtoWishlist, removeFromWishlist, isInWishlist,totalWishlistCount }}
    >
      {children}
    </WishListContext.Provider>
  );
}
