import { useState } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useProductsData } from "../../adminControlls/AdminProviders&Hooks";

const AdminProductsPage = () => {
  const { productsList, updateProductStock, deleteProduct } = useProductsData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priceFilter, setPriceFilter] = useState("All Prices");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedProduct.id);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const saveStockChanges = () => {
    if (selectedProduct) {
      updateProductStock(selectedProduct.id, selectedProduct.stock);
    }
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Filter products based on selected filters
  const filteredProducts = productsList?.filter((product) => {
    // Category filter
    if (categoryFilter !== "All Categories" && product.product_type !== categoryFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === "In Stock" && product.stock <= 0) {
      return false;
    }
    if (statusFilter === "Out of Stock" && product.stock > 0) {
      return false;
    }
    
    // Price filter
    if (priceFilter === "$0 - $50" && product.price > 50) {
      return false;
    }
    if (priceFilter === "$50 - $100" && (product.price <= 50 || product.price > 100)) {
      return false;
    }
    
    return true;
  });

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
                <label className="block text-gray-400 text-sm mb-1">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700"
                >
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Furniture</option>
                  <option>Books</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700"
                >
                  <option>All Status</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Price Range</label>
                <select 
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700"
                >
                  <option>All Prices</option>
                  <option>$0 - $50</option>
                  <option>$50 - $100</option>
                  <option>$100+</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    // Reset all filters
                    setCategoryFilter("All Categories");
                    setStatusFilter("All Status");
                    setPriceFilter("All Prices");
                  }}
                  className="bg-gray-700 hover:bg-gray-600 w-full px-4 py-2 rounded-lg text-sm"
                >
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
                        ${product?.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product?.stock > 0
                            ? "bg-green-900/30 text-green-400"
                            : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {product?.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 pb-4 flex justify-between border-t border-gray-800 pt-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1"
                      aria-label="Edit product"
                    >
                      <FiEdit size={16} />
                      <span className="text-xs hidden sm:inline">Edit</span>
                    </button>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewClick(product)}
                        className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
                        aria-label="View details"
                      >
                        <FiEye size={16} />
                        <span className="text-xs hidden sm:inline">View</span>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
                        aria-label="Delete product"
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
                <button 
                  onClick={() => {
                    setCategoryFilter("All Categories");
                    setStatusFilter("All Status");
                    setPriceFilter("All Prices");
                  }}
                  className="mt-2 text-emerald-400 hover:text-emerald-300"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination - Removed for brevity, can be added back as needed */}
        </main>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update Stock</h3>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden mr-3">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedProduct.title}</h4>
                  <p className="text-sm text-gray-400">${selectedProduct.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Stock</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setSelectedProduct({
                        ...selectedProduct,
                        stock: Math.max(0, selectedProduct.stock - 1)
                      })}
                      className="px-3 py-1 bg-gray-700 rounded-l-lg hover:bg-gray-600"
                    >
                      -
                    </button>
                    {/* <input
                      type="number"
                      value={selectedProduct.stock}
                      onChange={(e) => setSelectedProduct({
                        ...selectedProduct,
                        stock: Math.max(0, parseInt(e.target.value) || 0
                      })}
                      className="bg-[#2e2e2e] text-center w-full py-1 border-t border-b border-gray-700"
                    /> */}
                    <button 
                      onClick={() => setSelectedProduct({
                        ...selectedProduct,
                        stock: selectedProduct.stock + 1
                      })}
                      className="px-3 py-1 bg-gray-700 rounded-r-lg hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Status</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedProduct({
                        ...selectedProduct,
                        stock: selectedProduct.stock > 0 ? selectedProduct.stock : 1
                      })}
                      className={`px-4 py-2 rounded-lg ${selectedProduct.stock > 0 ? 'bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      In Stock
                    </button>
                    <button
                      onClick={() => setSelectedProduct({
                        ...selectedProduct,
                        stock: 0
                      })}
                      className={`px-4 py-2 rounded-lg ${selectedProduct.stock === 0 ? 'bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      Out of Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveStockChanges}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-64 object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold">{selectedProduct.title}</h4>
                  <p className="text-emerald-500 text-sm">{selectedProduct.product_type}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-bold">${selectedProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stock:</span>
                    <span className={`font-bold ${selectedProduct.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} available` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product ID:</span>
                    <span className="text-gray-300">{selectedProduct.id}</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-gray-400 mb-1">Description</h5>
                  <p className="text-gray-300 text-sm">{selectedProduct.description || 'No description available'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedProduct.title}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;