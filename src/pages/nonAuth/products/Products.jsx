import { useEffect, useState } from "react";
import { GetAllProducts } from "../../../API/ShowProducts";
import { useNavigate } from "react-router-dom";
import { AddToCartButton, FavoriteButton } from "../../common/buttons/Buttons";

export default function Products() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllProducts();
        setProducts(data);
      } catch (error) {
        console.log("error fetching products", error.message);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex gap-6">
        {/* Sticky Filter Panel */}
        <div className="hidden md:block w-1/5">
          <div className="sticky top-24 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-indigo-600 cursor-pointer">All</li>
              <li className="hover:text-indigo-600 cursor-pointer">
                Smoothies
              </li>
              <li className="hover:text-indigo-600 cursor-pointer">Bowls</li>
              <li className="hover:text-indigo-600 cursor-pointer">Bites</li>
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">
            Our Products
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer border rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white p-8"
                >
                  <img
                    onClick={() =>
                      navigate(`/productDetails/${product.id}`, {
                        state: product,
                      })
                    }
                    src={product.image}
                    alt={product.imageAlt || product.title}
                    className="w-full h-40 object-cover group-hover:opacity-90 transition"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {product.product_description || "No description"}
                    </p>
                    <p className="text-indigo-600 font-semibold text-sm mt-2">
                      ₹ {product.price}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <AddToCartButton />
                    <FavoriteButton />
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-center text-gray-500">Products Not Found</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
