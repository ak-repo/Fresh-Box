import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductController } from "../../../customHooks/useProductController";
import { useWishlist, useCart } from "../../../ContextAPI/ContextCreater&Hook";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <LandingImgSection navigate={navigate} />
      <OurOffering />
      <BestSellerNewItems navigate={navigate} />
    </div>
  );
}

const LandingImgSection = ({ navigate }) => {
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
    <section className="relative h-[90vh] max-h-[1000px] min-h-[600px] w-full overflow-hidden">
      {/* Crisp background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Text container with semi-transparent background */}
      <div className="relative z-10 h-[800px] flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg p-8 bg-black/60 rounded-xl  backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {currentSlide.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {currentSlide.description}
            </p>
            <div className="flex space-x-4">
              <button
                className="px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </button>
              <button
                className="px-8 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => navigate("/aboutUs")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex space-x-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              />
            ))}
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Offerings
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes our products stand out from the rest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-gray-100 rounded-lg p-6 mb-6 flex justify-center group-hover:bg-indigo-50 transition-colors duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellerNewItems({ navigate }) {
  const [bestSellers, setBestSellers] = useState(null);
  const [newArrivals, setNewArrivals] = useState(null);
  const [activeTab, setActiveTab] = useState("bestseller");
  const { addtoWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { getAllProducts } = useProductController();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setBestSellers(data.slice(0, 8));
        setNewArrivals(data.slice(data.length - 8));
      } catch (error) {
        console.log("Error fetching products:", error.message);
      }
    })();
  }, []);

  const handleWishlist = (product) => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addtoWishlist(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const products = activeTab === "bestseller" ? bestSellers : newArrivals;

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Picks For You
          </h2>
          <div className="inline-flex bg-gray-100 p-1 rounded-full mb-8">
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "bestseller"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              } flex items-center justify-center cursor-pointer`}
            >
              {activeTab === "bestseller" && <span className="mr-2">🔥</span>}
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "new"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              } flex items-center justify-center cursor-pointer`}
            >
              {activeTab === "new" && <span className="mr-2">🆕</span>}
              New Items
            </button>
          </div>
        </div>
        {products ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
              >
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label={
                    isInWishlist(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {isInWishlist(product.id) ? (
                    <span className="text-red-500 text-xl">♥</span>
                  ) : (
                    <span className="text-gray-400 text-xl hover:text-red-500">
                      ♡
                    </span>
                  )}
                </button>

                <div
                  className="aspect-square overflow-hidden bg-gray-50 cursor-pointer relative"
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emrabg-emerald-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-emrabg-emerald-500 font-bold text-lg mb-4">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 text-sm bg-gray-900 hover:bg-black text-white rounded-lg 
                    transition-all duration-200 ease-in-out 
                    transform group-hover:scale-[1.02] active:scale-[0.98]
                    cursor-pointer shadow hover:shadow-md
                    border border-transparent hover:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emrabg-emerald-500 mb-4"></div>
            <p className="text-gray-500">Loading delicious products...</p>
          </div>
        )}
      </div>
    </section>
  );
}
