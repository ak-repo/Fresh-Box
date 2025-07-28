import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useProductsData } from "../../adminControlls/AdminProviders&Hooks";

const AdminProductsPage = () => {
  const { productsList, updateProductStock, deleteProduct } = useProductsData();
  const [filteredProducts, setFilterProduct] = useState([]);

  const [viewModel, setViewModel] = useState(false);
  const [deleteModel, setDelteModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  useEffect(() => {
    setFilterProduct(productsList);
  }, [productsList]);

  //view model
  const handleView = (product) => {
    setViewModel(true);
    setSelectProduct(product);
  };

  //edit model
  const handleEdit = (product) => {
    setEditModel(true);
    setSelectProduct(product);
  };

  // delte model
  const handleDelete = (product) => {
    setDelteModel(true);
    setSelectProduct(product);
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <button className="bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg text-sm">
              Add New Product
            </button>
          </div>

          {/* Product Filters */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Category
                </label>
                <select className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Furniture</option>
                  <option>Books</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Status
                </label>
                <select className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700">
                  <option>All Status</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Price Range
                </label>
                <select className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700">
                  <option>All Prices</option>
                  <option>$0 - $50</option>
                  <option>$50 - $100</option>
                  <option>$100+</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="bg-gray-700 hover:bg-gray-600 w-full px-4 py-2 rounded-lg text-sm">
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product?.id}
                  className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product?.stock <= 0 && (
                      <span className="absolute top-2 right-2 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-gray-100 line-clamp-1">
                      {product?.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">Category:</span>
                      <span className="text-xs font-medium text-emerald-500">
                        {product?.product_type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-white">
                        ${product?.price}
                      </span>
                      <span>
                        {product?.quantity > 0 ? (
                          <p className="text-green-500 font-bold ">
                            In stock = {product?.quantity}{" "}
                          </p>
                        ) : (
                          <p className="text-red-500 font-bold blod">
                            Out of Stock
                          </p>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 pb-4 flex justify-between border-t border-gray-800 pt-3">
                    <button
                      className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1"
                      aria-label="Edit product"
                      onClick={() => handleEdit(product)}
                    >
                      <FiEdit size={16} />
                      <span className="text-xs hidden sm:inline">Edit</span>
                    </button>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleView(product)}
                        className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors flex items-center space-x-1"
                        aria-label="View details"
                      >
                        <FiEye size={16} />
                        <span className="text-xs hidden sm:inline">View</span>
                      </button>

                      <button
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
                        aria-label="Delete product"
                        onClick={() => handleDelete(product)}
                      >
                        <FiTrash2 size={16} />
                        <span className="text-xs hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">No products match your filters</p>
                <button className="mt-2 text-emerald-400 hover:text-emerald-300">
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination - Removed for brevity, can be added back as needed */}
        </main>
      </div>

      {/* Edit Product Modal */}
      {editModel && (
        <EditModelComponent
          setEditModel={setEditModel}
          product={selectedProduct}
          updateProductStock={updateProductStock}
        />
      )}

      {/* View Product Modal */}
      {viewModel && (
        <ViewModelComponent
          setViewModel={setViewModel}
          product={selectedProduct}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModel && (
        <DeleteModelComponent
          setDelteModel={setDelteModel}
          product={selectedProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;

const EditModelComponent = ({ product, updateProductStock, setEditModel }) => {
  const [currentStrock, setCurrentStock] = useState(product?.quantity);

  const handleSave = () => {
    setEditModel(false);
    updateProductStock(product?.id, currentStrock);
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Update Stock</h3>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden mr-3">
              <img
                className="w-full h-full object-cover"
                src={product?.image}
              />
            </div>
            <div>
              <h4 className="font-semibold">{product?.title}</h4>
              <p className="text-sm text-gray-400">{product?.price}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Current Stock
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentStock((pre) => pre - 1)}
                  disabled={currentStrock <= 0}
                  className="px-3 py-1 bg-gray-700 rounded-l-lg hover:bg-gray-600"
                >
                  -
                </button>
                <p className="text-emerald-500 font-bold px-2">
                  {currentStrock}
                </p>
                <button
                  onClick={() => setCurrentStock((pre) => pre + 1)}
                  className="px-3 py-1 bg-gray-700 rounded-r-lg hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <div className="flex space-x-4">
                {currentStrock > 0 ? (
                  <p className="text-green-600">In Stock</p>
                ) : (
                  <p className="text-red-500">Out Of Stock</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setEditModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewModelComponent = ({ product, setViewModel }) => {
  return (
    <div className="fixed inset-0  backdrop-blur-sm  bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4">Product Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-contain"
              src={product?.image}
              alt={product?.title}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold">{product?.title}</h4>
              <p className="text-emerald-500 text-sm">
                {product?.product_type}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="font-bold">{product?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stock:</span>
                <span
                  className={`font-bold ${
                    product?.quantity > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {product?.quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Product ID:</span>
                <span className="text-gray-300">{product?.id}</span>
              </div>
            </div>

            <div>
              <h5 className="text-gray-400 mb-1">Description</h5>
              <small className="text-gray-300 text-sm">
                {product?.product_description}
              </small>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setViewModel(false)}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModelComponent = ({ product, setDelteModel, deleteProduct }) => {
  const handleDelete = (productId) => {
    setDelteModel(false);
    deleteProduct(productId);
  };
  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{product?.title}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setDelteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(product?.id)}
            className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
