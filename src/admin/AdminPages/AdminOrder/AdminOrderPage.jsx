import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
  FiEdit,
  FiShoppingCart,
} from "react-icons/fi";
import { useOrdersData } from "../../adminControlls/AdminProviders&Hooks";

const AdminOrderspage = () => {
  const {
    ordersList,
    deliveredOrders,
    cancelledOrders,
    PendingOrders,
    updateOrderStatus,
  } = useOrdersData();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.orderId, newStatus);
      setShowEditModal(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <div className="flex space-x-3">
              <button className="border border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-[#2e2e2e]">
                Export
              </button>
              <button className="bg-emerald-700 hover:bg-emerald-900 px-4 py-2 rounded-lg text-sm">
                Create Order
              </button>
            </div>
          </div>

          {/* Order Stats - Added back this section */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">
                    {ordersList && ordersList.length}
                  </p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg h-fit">
                  <FiShoppingCart size={24} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold mt-1">
                    {deliveredOrders.length}
                  </p>
                </div>
                <div className="bg-green-900/30 p-3 rounded-lg h-fit">
                  <FiCheckCircle size={24} className="text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Processing</p>
                  <p className="text-2xl font-bold mt-1">
                    {PendingOrders.length}
                  </p>
                </div>
                <div className="bg-yellow-900/30 p-3 rounded-lg h-fit">
                  <FiClock size={24} className="text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Canceled</p>
                  <p className="text-2xl font-bold mt-1">
                    {cancelledOrders.length}
                  </p>
                </div>
                <div className="bg-red-900/30 p-3 rounded-lg h-fit">
                  <FiXCircle size={24} className="text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList &&
                    ordersList.map((order) => (
                      <tr
                        key={order?.orderId}
                        className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                      >
                        <td className="py-4 text-emerald-700">
                          {order?.orderId}
                        </td>
                        <td>{order?.userName}</td>
                        <td>
                          {(order?.orderedAt &&
                            new Date(order?.orderedAt)
                              .toLocaleDateString("en-GB")
                              .replaceAll("/", "-")) ||
                            "Not found"}
                        </td>
                        <td>${order?.totalAmount}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order?.status === "delivered"
                                ? "bg-green-900 text-green-300"
                                : order?.status === "pending"
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {order?.status}
                          </span>
                        </td>
                        <td className="flex items-center space-x-2 py-4">
                          <button
                            onClick={() => handleViewClick(order)}
                            className="text-blue-400 hover:text-blue-300 p-1.5 rounded hover:bg-blue-900/20"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditClick(order)}
                            className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded hover:bg-emerald-900/20"
                          >
                            <FiEdit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-400">
                Showing 1 to {Math.min(5, ordersList?.length || 0)} of{" "}
                {ordersList?.length || 0} orders
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded border border-gray-700">
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-emerald-700">1</button>
                <button className="px-3 py-1 rounded border border-gray-700">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Order Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span>{selectedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span>{selectedOrder.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span>
                      {new Date(selectedOrder.orderedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`${
                        selectedOrder.status === "delivered"
                          ? "text-green-400"
                          : selectedOrder.status === "pending"
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="font-bold">
                      ${selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Products</h4>
                <div className="space-y-3">
                  {selectedOrder.products?.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-start border-b border-gray-800 pb-3"
                    >
                      <div className="w-16 h-16 bg-gray-800 rounded-lg mr-3 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-400">
                          Qty: {product.quantity}
                        </p>
                        <p className="text-sm">
                          ${product.price?.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
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

      {/* Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update Order Status</h3>

            <div className="mb-6">
              <div className="mb-4">
                <h4 className="font-semibold">{selectedOrder.orderId}</h4>
                <p className="text-sm text-gray-400">
                  Customer: {selectedOrder.userName}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Current Status
                  </label>
                  <p
                    className={`px-3 py-1 rounded-full inline-block ${
                      selectedOrder.status === "delivered"
                        ? "bg-green-900 text-green-300"
                        : selectedOrder.status === "pending"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {selectedOrder.status}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Change Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStatusChange("pending")}
                      className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                        selectedOrder.status === "pending"
                          ? "bg-yellow-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <FiClock className="text-yellow-400" />
                      <span>Pending</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange("delivered")}
                      className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                        selectedOrder.status === "delivered"
                          ? "bg-green-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <FiCheckCircle className="text-green-400" />
                      <span>Delivered</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange("cancelled")}
                      className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                        selectedOrder.status === "cancelled"
                          ? "bg-red-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <FiXCircle className="text-red-400" />
                      <span>Cancel</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderspage;
