// Wishlist.jsx
import { useNavigate } from "react-router-dom";
import { useWishlistController } from "../../../customHooks/useWishlistController";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistController();
  const navigate = useNavigate();
  if (!wishlist) {
    navigate("/login");
  }

  // const handleAddToCart = (product) => {
  //   // Optional: Show a toast notification
  //   // toast.success(`${product.title} added to cart!`);
  // };

  return (
    <div className="max-w-md mx-auto p-6 min-h-[500px]">
      {" "}
      {/* Fixed minimum height */}
      {/* Header */}
      <div className="text-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">My Wishlist</h1>
        <p className="text-gray-500">Your favorite items</p>
      </div>
      {/* Wishlist Items */}
      <div className="space-y-4">
        {wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              Your wishlist is empty
            </h3>
            <p className="mt-1 text-gray-400">Start adding some favorites!</p>
          </div>
        ) : (
          wishlist.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={product.image || "/placeholder-product.jpg"}
                  alt={product.title}
                  className="h-16 w-16 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.jpg";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800 line-clamp-1">
                  {product.title}
                </h3>
                {product.price > 0 && (
                  <p className="text-sm font-medium text-gray-600">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-2">
                {/* Add to Cart Button - Add your functionality here */}
                <button
                  // onClick={() => handleAddToCart(product)}
                  className="w-8 mt-3 mx-6 py-2 text-sm bg-[#2e2e2e] hover:bg-black text-white rounded-md transition-colors"
                >
                  Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-gray-400 hover:text-pink-500 transition-colors p-1"
                  aria-label="Remove item"
                  title="Remove from wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
