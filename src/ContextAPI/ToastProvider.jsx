import Cart from "../pages/nonAuth/cart/Cart";
import Wishlist from "../pages/nonAuth/wishlist/WishList";
import { ToastContext } from "./AuthContext";
import { Toaster, toast } from "react-hot-toast";

export default function ToastProvider({ children }) {
  const toastSuccess = (message) => {
    toast.success(message);
  };
  const toastFail = (message) => {
    toast.error(message);
  };
  return (
    <ToastContext.Provider value={{ toastFail, toastSuccess }}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "14px",
            padding: "6px 12px",
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
}

// messages = login
// | Event                | Toast Message                                       |
// | -------------------- | --------------------------------------------------- |
// | Login Success        | 🎉 Welcome back! You’ve logged in successfully.     |
// | Login Fail           | ❌ Oops! Invalid credentials. Please try again.      |
// | Registration Success | 👋 Account created! Let’s get you started.          |
// | Registration Fail    | ⚠️ Couldn’t create account. Please try again later. |

// messfae= Cart| Event            | Toast Message                                     |
// | ---------------- | ------------------------------------------------- |
// | Add to Cart      | 🛒 Added to cart! Ready to checkout when you are. |
// | Remove from Cart | ❌ Removed from cart. Maybe next time!             |

// Wishlist| Event                | Toast Message                                        |
// | -------------------- | ---------------------------------------------------- |
// | Add to Wishlist      | 💖 Saved to your wishlist. Come back anytime!        |
// | Remove from Wishlist | 💔 Removed from your wishlist. Hope you find better! |

// payment

// | Event           | Toast Message                                               |
// | --------------- | ----------------------------------------------------------- |
// | Payment Success | ✅ Payment received! Thank you for your purchase.            |
// | Payment Fail    | ⚠️ Payment failed. Please check your details and try again. |

// logout
// | Event  | Toast Message                            |
// | ------ | ---------------------------------------- |
// | Logout | 👋 You’ve been logged out. See you soon! |
//⚠️ Login Required
