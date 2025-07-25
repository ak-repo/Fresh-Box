import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Thoughtfully crafted</span>
              <span className="block">nourishment</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600">
              Our commitment to quality ingredients and effortless preparation
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <div className="bg-gray-100 aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <video width="600" controls autoPlay muted loop>
                <source src="/assets/aboutVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Origin
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2025, we recognized a growing need for genuinely
              nourishing food that fits modern lifestyles. Too often,
              convenience meant compromising on quality or nutrition.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We set out to change that by creating a new category of prepared
              foods - ones that prioritize whole ingredients, thoughtful
              preparation, and honest flavors, without sacrificing time or
              taste.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Discover Our Products
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Approach</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              How we create products that stand apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ingredient Standards",
                description:
                  "We source only whole, recognizable ingredients—nothing artificial or unnecessary.",
              },
              {
                title: "Preparation Methods",
                description:
                  "Techniques that preserve nutrition and amplify natural flavors.",
              },
              {
                title: "Quality Verification",
                description:
                  "Rigorous testing at every stage from farm to fulfillment.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Philosophy
          </h2>
          <div className="prose-lg text-gray-600 mx-auto">
            <p className="mb-6">
              We believe good food should be both nourishing and accessible.
              That means eliminating the tradeoffs between quality and
              convenience, between nutrition and flavor.
            </p>
            <p className="mb-6">
              Every decision—from sourcing partners to packaging materials—is
              made with this balance in mind. We're building a new model for
              prepared foods, one that honors both the integrity of ingredients
              and the realities of modern life.
            </p>
            <p>
              The result is a product line that delivers on its promises without
              compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="border-t border-gray-200 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Experience the difference
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Our Offerings
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
