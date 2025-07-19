import { useState, useEffect } from "react";
import { GetAllProducts } from "../../../API/ShowProducts";
import { useNavigate } from "react-router-dom";
import { AddToCartButton, FavoriteButton } from "../../common/buttons/Buttons";


export default function Landing() {
  return (
    <>
      <LandingImgSection />
      <OurOffering />
      <BestSellerNewItems />
    </>
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
        "A perfect morning start — hearty, nourishing, and crafted with nature’s best ingredients.",
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
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <main>
      <div className="flex flex-col md:flex-row items-center justify-center px-8 py-16 bg-[var(--color-bg)] transition-all duration-500">
        {/* Left Side - Image */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-100 h-100 object-cover rounded shadow "
          />
        </div>
        {/* <img src="../../../../public/"/> */}

        {/* Right Side - Text */}
        <div className="md:w-1/2 text-center md:text-left px-4">
          <h2 className="text-3xl font-bold text-[var(--color-dark)] mb-4">
            {currentSlide.title}
          </h2>
          <p className="text-lg text-[var(--color-text-light)]">
            {currentSlide.description}
          </p>
        </div>
      </div>
    </main>
  );
};

function OurOffering() {
  const categories = [
    {
      image:
        "https://daily-harvest.com/cdn/shop/files/MayTestValuePropImage1.png?v=1746575761&width=640",
      title: "Uncompromised Quality",
      description:
        "	We source only the finest natural ingredients, ensuring every bite is fresh, flavorful, and nourishing.",
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
    <section className="py-12 bg-[var(--color-bg)]">
      <h2 className="text-3xl font-bold text-center text-[var(--color-dark)] mb-8">
        Our Offerings
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-6 md:space-y-0 px-4">
        {categories.map((item, idx) => (
          <div key={idx} className="text-center max-w-xs">
            <img
              src={item.image}
              alt={item.title}
              className="w-48 h-48 mx-auto object-cover rounded shadow mb-4"
            />
            <h3 className="text-xl font-semibold text-[var(--color-dark)] mb-2">
              {item.title}
            </h3>
            <p className="text-[var(--color-text-light)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Best seller and New items section

function BestSellerNewItems() {
  const [bestSellers, setBestSellers] = useState(null);
  const [newArrivals, setNewArrivals] = useState(null);
  const [activeTab, setActiveTab] = useState("bestseller");
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   console.log("Best Sellers:", bestSellers);
  // }, [bestSellers]);

  // useEffect(() => {
  //   console.log("New Arrivals:", newArrivals);
  // }, [newArrivals]);

  const products = activeTab === "bestseller" ? bestSellers : newArrivals;

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">Our Picks For You</h2>

        {/* Toggle Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab("bestseller")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "bestseller"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "new"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            New Items
          </button>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white p-5"
              >
                <img
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                    {product.title}
                  </h3>
                  <p className="text-indigo-600 text-sm font-bold">
                    ₹ {product.price}
                  </p>
                </div>
                <div className="flex justify-between">
                  <AddToCartButton />
                  <FavoriteButton />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
