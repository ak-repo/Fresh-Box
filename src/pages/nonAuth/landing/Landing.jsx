import { useState, useEffect } from "react";
import { GetAllProducts } from "../../../API/ShowProducts";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-white">
      <LandingImgSection />
      <OurOffering />
      <BestSellerNewItems />
    </div>
  );
}

const LandingImgSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: "assets/smoothies/smoothie01.jpg",
      title: "Fresh-Blended Smoothies",
      description:
        "Packed with real fruits & veggies. Ready in minutes for a nourishing boost anytime.",
    },
    {
      image: "assets/breackfast-bow/breakfast-bows01.jpg",
      title: "Wholesome Breakfast Bowls",
      description:
        "A perfect morning start — hearty, nourishing, and crafted with nature's best ingredients.",
    },
    {
      image: "assets/Bites/bites01.jpg",
      title: "Energizing Bites",
      description:
        "Snack smart with plant-powered bites made for guilt-free cravings and daily energy.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-[80vh] min-h-[600px] bg-white overflow-hidden">
      <div className="container h-full mx-auto px-6 flex items-center">
        {/* Image Side (Left) - 50% width */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 relative">
          {/* Blur Circle Background */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gray-100 filter blur-3xl opacity-70 z-0"></div>

          <div className="relative h-4/5 w-full max-w-md z-10">
            <div className="absolute inset-0 rounded-3xl shadow-lg overflow-hidden">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-contain transition-opacity duration-1000"
              />
            </div>
            <div className="absolute -inset-4 border border-gray-200 rounded-3xl pointer-events-none"></div>
          </div>
        </div>

        {/* Content Side (Right) - 50% width */}
        <div className="w-full md:w-1/2 h-full flex items-center p-8">
          <div className="max-w-md space-y-6 transform transition-all duration-500">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {currentSlide.title}
              <span className="block h-1 w-20 mt-4 bg-gray-900 rounded-full"></span>
            </h1>
            <p className="text-xl text-gray-600">{currentSlide.description}</p>
            <button className="px-8 py-3 rounded-lg bg-black text-white font-medium   hover:bg-gray-300 hover:text-black transition-all duration-300 shadow-md">
              Shop Now
            </button>

            {/* Indicators */}
            <div className="flex space-x-3 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8 bg-black" : "w-4 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function OurOffering() {
  const categories = [
    {
      image:
        "https://daily-harvest.com/cdn/shop/files/MayTestValuePropImage1.png?v=1746575761&width=640",
      title: "Uncompromised Quality",
      description:
        "We source only the finest natural ingredients, ensuring every bite is fresh, flavorful, and nourishing.",
    },
    {
      image:
        "https://daily-harvest.com/cdn/shop/files/May_Test_ValueProp3.png?v=1745507982&width=320",
      title: "Thoughtful Cultivation & Storing",
      description:
        "From farm to storage, we follow clean, sustainable practices that preserve natural goodness.",
    },
    {
      image:
        "https://daily-harvest.com/cdn/shop/files/May_Test_ValueProp5.png?v=1745507985&width=320",
      title: "Ready When You Are",
      description:
        "Our products are designed for your lifestyle — easy to prepare, ready in minutes, with zero hassle",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Offerings
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our products stand out from the rest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-gray-100 rounded-lg p-4 mb-6 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useWishlistController } from "../../../customHooks/useWishlistController";
import { useCartController } from "../../../customHooks/useCartController";

function BestSellerNewItems() {
  const [bestSellers, setBestSellers] = useState(null);
  const [newArrivals, setNewArrivals] = useState(null);
  const [activeTab, setActiveTab] = useState("bestseller");
  const navigate = useNavigate();
  const { addtoWishlist, removeFromWishlist, isInWishlist } =
    useWishlistController();
  const { addToCart } = useCartController();

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllProducts();
        setBestSellers(data.slice(0, 8));
        setNewArrivals(data.slice(data.length - 8));
      } catch (error) {
        console.log("Error fetching products:", error.message);
      }
    })();
  }, []);

  //wishLish
  const handleWishlist = (product) => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addtoWishlist(product);
  };

  //cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const products = activeTab === "bestseller" ? bestSellers : newArrivals;

  return (
    <section className="py-6 bg-white">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="text-center mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Our Picks For You
          </h2>
          <div className="inline-flex bg-gray-100 p-0.5 rounded-lg">
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "bestseller"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "new"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              New Items
            </button>
          </div>
        </div>
        {products ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                {/* Heart Icon - Top Right */}
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 transition-colors z-10"
                  aria-label={
                    isInWishlist(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {isInWishlist(product.id) ? (
                    <span className="text-red-500 text-lg">♥</span>
                  ) : (
                    <span className="text-gray-400 text-lg hover:text-red-500">
                      ♡
                    </span>
                  )}
                </button>

                {/* Product Image */}
                <div
                  className="aspect-square overflow-hidden bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-indigo-600 font-semibold text-sm">
                    ₹{product.price}
                  </p>

                  {/* Add to Cart Button - Bottom */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-[80%] mt-3 mx-6 py-2 text-sm bg-[#2e2e2e] hover:bg-black text-white rounded-md transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Loading products...</p>
          </div>
        )}
      </div>
    </section>
  );
}
