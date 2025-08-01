import { useState } from "react";
import { useProductsData } from "../../adminControlls/AdminProviders&Hooks";

const ProductFormPopup = ({ setAddModel }) => {
  const { createNewProduct } = useProductsData();
  const [formData, setFormData] = useState({
    id: "",
    quantity: 0,
    key: "",
    title: "",
    price: 0,
    discounted_price: 0,
    image: "",
    product_type: "",
    product_description: "",
  });

  //filling the form data
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // hanlde save and add data into products
  const handleSave = () => {
    setAddModel(false);
    createNewProduct(formData);
  };
  return (
    <div className="p-4 ">
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2e2e2e] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button
              onClick={() => setAddModel(false)}
              className="text-gray-500 bg-white p-1 rounded-xs   cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Basic Information */}
            <div className="grid text-white grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={(e) => handleForm(e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Title
                </label>
                <input
                  value={formData.title}
                  name="title"
                  onChange={(e) => handleForm(e)}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter product title"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Price
                </label>
                <input
                  value={formData.price}
                  name="price"
                  onChange={(e) => handleForm(e)}
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Type
                </label>
                <input
                  value={formData.product_type}
                  name="product_type"
                  onChange={(e) => handleForm(e)}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter Category eg: Pasta"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Product Description
              </label>
              <textarea
                value={formData.product_description}
                name="product_description"
                onChange={(e) => handleForm(e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
              ></textarea>
            </div>

            {/* Quantity Rules */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-emerald-700 mb-3">Quantity </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Minimum 1
                  </label>
                  <input
                    value={formData.quantity}
                    name="quantity"
                    onChange={(e) => handleForm(e)}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter min quantity"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Image URL
              </label>
              <input
                value={formData.image}
                name="image"
                onChange={(e) => handleForm(e)}
                type="url"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter image URL"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-4 border-t">
            <button
              onClick={() => setAddModel(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-white hover:bg-emetext-emerald-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-700 text-white rounded-md cursor-pointer hover:bg-emerald-900"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPopup;
