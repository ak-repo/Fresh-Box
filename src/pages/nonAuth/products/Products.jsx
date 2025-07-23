import { useEffect, useState } from "react";
import { GetAllProducts } from "../../../ContextAPI/ShowProducts";
import { useNavigate } from "react-router-dom";
import { useWishlistController } from "../../../customHooks/useWishlistController";
import { useCartController } from "../../../customHooks/useCartController";
import { toast } from "react-toastify"; // or any other notification system

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetAllProducts();
        setProducts(data);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching products", error.message);
        setError("Failed to load products. Please try again later.");
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);
  const handleCategoryChange = (category) => {
    console.log(category);
    if (category === "All") {
      setCategory(products);
    } else {
      setCategory(() => {
        return products.filter((item) => item.product_type === category);
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sticky Filter Panel */}

        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Filter Products
            </h3>

            <nav className="space-y-2">
              {["All", "Smoothie", "Breakfast Bowl", "Bite"].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
            w-full flex items-center px-4 py-2.5 text-sm rounded-lg
            transition-all duration-150 ease-out
            ${
              selectedCategory === category
                ? "bg-blue-100/80 text-blue-700 font-medium shadow-inner"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
                >
                  <span
                    className={`mr-2 ${
                      selectedCategory === category
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    {category === "Smoothie" && "🥤"}
                    {category === "Breakfast Bowl" && "🥣"}
                    {category === "Bite" && "🍪"}
                  </span>
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-auto text-blue-500">→</span>
                  )}
                </button>
              ))}
            </nav>
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
            <ProductCart products={selectedCategory} />
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
  const handleAddToCart = (product) => {
    console.log(" handle");
    addToCart(product);
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
                <button
                  onClick={() => handleWishlist(product)}
                  className="p-2 rounded-full transition-all duration-300 ease-in-out 
            hover:bg-pink-50 active:scale-90 focus:outline-none
            focus:ring-2 focus:ring-pink-200 cursor-pointer"
                  aria-label={
                    isInWishlist(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <span
                    className={`text-xl ${
                      isInWishlist(product.id)
                        ? "text-pink-500 animate-pulse"
                        : "text-gray-400 hover:text-pink-300"
                    }`}
                  >
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                  </span>
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-[80%] mt-3 mx-6 py-2 text-sm bg-[#2e2e2e] hover:bg-black text-white rounded-md 
             transition-all duration-200 ease-in-out 
             transform hover:scale-[1.02] active:scale-[0.98]
             cursor-pointer shadow-md hover:shadow-lg active:shadow-inner
             border border-transparent hover:border-gray-600
             focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer"
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
