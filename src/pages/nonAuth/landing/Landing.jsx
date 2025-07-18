import { useState, useEffect } from "react";

export default function Landing() {
  return (
    <>
      <LandingImgSection />
      <OurOffering />
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
            className="w-80 h-80 object-cover rounded shadow"
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
