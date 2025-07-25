import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProductController } from "../../../customHooks/useProductController";
import { useWishlist,useCart } from "../../../ContextAPI/ContextCreater&Hook";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { addtoWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { getProductById } = useProductController();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductById(productId);

        setProduct(data);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    })();
  }, []);

  // handle wishlist

  const handleWishlist = () => {
    isInWishlist(productId)
      ? removeFromWishlist(productId)
      : addtoWishlist(product);
  };

  // handle cart
  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">Loading...</div>
    );
  }

  return (
    <div className="bg-white py-6 px-3 sm:px-4 lg:px-6 text-sm">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-lg object-cover shadow-md max-w-xs mx-auto"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-gray-700">{product.product_description}</p>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-900">
                Highlights
              </h3>
              <ul className="mt-1 list-disc pl-4 text-gray-600 space-y-1">
                <li>Weight: {product.grams}g</li>
                <li>
                  Delivery:{" "}
                  {product.selling_plan_allocation?.selling_plan?.name ||
                    "One-time purchase"}
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-900">Details</h3>
              <p className="mt-1 text-gray-600">
                {product.details || "No extra details provided."}
              </p>
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-4">
            <p className="text-xl font-bold text-gray-900">₹ {product.price}</p>
            {product.total_discount > 0 && (
              <div className="mt-1">
                <span className="text-xs text-green-600 font-medium">
                  {product.discounts[0]?.title} - ₹{product.total_discount} OFF
                </span>
                <p className="text-xs text-gray-400 line-through">
                  ₹ {product.original_price}
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={handleWishlist}>
                {" "}
                {isInWishlist(product.id) ? "💖 " : "🤍"}
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-[80%] mt-3 mx-6 py-2 text-sm bg-[#2e2e2e] hover:bg-black text-white rounded-md 
             transition-all duration-200 ease-in-out 
             transform hover:scale-[1.02] active:scale-[0.98]
             cursor-pointer shadow-md hover:shadow-lg active:shadow-inner
             border border-transparent hover:border-gray-600
             focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
