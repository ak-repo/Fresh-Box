import { useEffect, useState } from "react";
import { GetAllProducts } from "../../../API/ShowProducts";
import { useNavigate } from "react-router-dom";
import { useWishlistController } from "../../../customHooks/useWishlistController";
import { useCartController } from "../../../customHooks/useCartController";
import { toast } from "react-toastify"; // or any other notification system

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error.message);
        setError("Failed to load products. Please try again later.");
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sticky Filter Panel */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">
              Filters
            </h3>
            <ul className="space-y-3">
              {["All", "Smoothies", "Bowls", "Bites"].map((category) => (
                <li
                  key={category}
                  className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200 px-2 py-1 rounded-md hover:bg-indigo-50"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Our Products
          </h2>
          {error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <ProductCart products={products} />
          )}
        </div>
      </div>
    </div>
  );
}

const ProductCart = ({ products }) => {
  const navigate = useNavigate();
  const { addtoWishlist, removeFromWishlist, isInWishlist } =
    useWishlistController();
  const { addToCart } = useCartController();

  //navigation to detailed page
  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };
  //handle wishlist
  const handleWishlist = (product) => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addtoWishlist(product);
  };

  //handle add to cart
  const handleAddToCart = (productId) => {
    console.log(' handle')
    addToCart(productId);
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products ? (
        products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div
              className="aspect-square overflow-hidden bg-gray-50 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.imageAlt || product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  {/* <p className="text-xs text-gray-500 line-clamp-2">
                    {product.product_description || "No description"}
                  </p> */}
                </div>
                <p className="text-indigo-600 font-semibold text-sm whitespace-nowrap ml-2">
                  ₹{product.price}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <button onClick={() => handleWishlist(product)}>
                  {" "}
                  {isInWishlist(product.id) ? "💖 " : "🤍"}
                </button>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-[80%] mt-3 mx-6 py-2 text-sm bg-[#2e2e2e] hover:bg-black text-white rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full py-12 text-center">
          <h3 className="text-gray-500">Loading products...</h3>
        </div>
      )}
    </div>
  );
};
