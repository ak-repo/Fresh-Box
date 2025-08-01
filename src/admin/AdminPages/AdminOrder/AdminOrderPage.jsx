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
import Pagination from "../common/Pagination";

const AdminOrderspage = () => {
  const {
    ordersList,
    deliveredOrders,
    cancelledOrders,
    pendingOrders,
    updateOrderStatus,
  } = useOrdersData();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Order Management</h1>
          
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
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold mt-1">
                    {pendingOrders.length}
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
            <div className="overflow-x-auto min-h-[80vh]">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 font-medium">Index</th>

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
                    ordersList.slice(start, end).map((order, index) => (
                      <tr
                        key={order?.orderId}
                        className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                      >
                        <td className="py-4 text-emerald-700">{index + 1}</td>
                        <td className="py-4 text-emerald-700">
                          {order?.orderId}
                        </td>
                        <td>{order?.userName}</td>
                        <td>{order?.orderedAt || "Not found"}</td>
                        <td>${order?.totalAmount?.totalCost}</td>
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
                            className="text-blue-400 cursor-pointer hover:text-blue-300 p-1.5 rounded hover:bg-blue-900/20"
                          >
                            <FiEye size={16} />
                          </button>
                          {order?.status !== "delivered" && (
                            <button
                              onClick={() => handleEditClick(order)}
                              className="text-emerald-400 cursor-pointer hover:text-emerald-300 p-1.5 rounded hover:bg-emerald-900/20"
                            >
                              <FiEdit size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              list={ordersList}
              setStart={setStart}
              start={start}
              setEnd={setEnd}
              pageSize={8}
            />
          </div>
        </main>
      </div>

      {/* View Order Modal */}
      {showViewModal && (
        <ViewModelComponent
          order={selectedOrder}
          setShowViewModal={setShowViewModal}
        />
      )}

      {/* Edit Order Modal */}

      {showEditModal && (
        <EditModelComponent
          setShowEditModal={setShowEditModal}
          order={selectedOrder}
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </div>
  );
};

export default AdminOrderspage;

export const ViewModelComponent = ({ order, setShowViewModal }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center  justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Order Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Order Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span>{order?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span>{order?.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span> {order?.orderedAt && order.orderedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span
                  className={`${
                    order?.status === "delivered"
                      ? "text-green-400"
                      : order?.status === "pending"
                      ? "text-yellow-400"
                      : order?.status === "cancelled"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {order?.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount:</span>
                <span className="font-bold">${order?.totalAmount?.totalCost}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <div className="space-y-3">
              {order?.items?.map((product, index) => (
                <div
                  key={product?.id || index}
                  className="flex items-start border-b border-gray-800 pb-3"
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-lg mr-3 overflow-hidden">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product?.title}</p>
                    <p className="text-sm text-gray-400">
                      Qty: {product.quantity}
                    </p>
                    <p className="text-sm">${product?.price} each</p>
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
  );
};

const EditModelComponent = ({ order, setShowEditModal, updateOrderStatus }) => {
  const [status, setStatus] = useState(order?.status);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };
  const handleStatusSubmit = () => {
    setShowEditModal(false);
    order.status = status;
    updateOrderStatus(order);
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Update Order Status</h3>

        <div className="mb-6">
          <div className="mb-4">
            <h4 className="font-semibold">{order?.orderId}</h4>
            <p className="text-sm text-gray-400">Customer: {order?.userName}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Current Status
              </label>
              <p
                className={`px-3 py-1 rounded-full inline-block ${
                  order?.status === "delivered"
                    ? "bg-green-900 text-green-300"
                    : order?.status === "pending"
                    ? "bg-yellow-900 text-yellow-300"
                    : order?.status === "cancelled"
                    ? "bg-red-500 text-white"
                    : order?.status === "shipped"
                    ? "bg-blue-900 text-blue-300"
                    : order?.status === "processed"
                    ? "bg-indigo-900 text-indigo-300"
                    : order?.status === "returned"
                    ? "bg-pink-900 text-pink-300"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {order?.status}
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
                    status === "pending"
                      ? "bg-yellow-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <FiClock className="text-yellow-400" />
                  <span>Pending</span>
                </button>

                <button
                  onClick={() => handleStatusChange("processing")}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    status === "processing"
                      ? "bg-yellow-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <FiClock className="text-yellow-400" />
                  <span>processing</span>
                </button>
                <button
                  onClick={() => handleStatusChange("shipped")}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    status === "shipped"
                      ? "bg-blue-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <FiClock className="text-yellow-400" />
                  <span>shipped</span>
                </button>
                <button
                  onClick={() => handleStatusChange("delivered")}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    status === "delivered"
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
                    status === "cancelled"
                      ? "bg-red-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <FiXCircle className="text-red-400" />
                  <span>Cancel</span>
                </button>

                <button
                  onClick={() => handleStatusChange("returned")}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    status === "returned"
                      ? "bg-red-900"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <FiClock className="text-yellow-400" />
                  <span>returned</span>
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
            className="px-4 py-2 rounded-lg border bg-emerald-700 border-gray-700 hover:bg-emerald-900"
            onClick={handleStatusSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

//  <div className="flex justify-between items-center mt-6">
//             <span className="text-gray-400">
//               Showing 1 to {Math.min(5, ordersList?.length || 0)} of{" "}
//               {ordersList?.length || 0} orders
//             </span>
//             <div className="flex space-x-2">
//               <button className="px-3 py-1 rounded border border-gray-700">
//                 Previous
//               </button>
//               <button className="px-3 py-1 rounded bg-emerald-700">1</button>
//               <button className="px-3 py-1 rounded border border-gray-700">
//                 2
//               </button>
//               <button className="px-3 py-1 rounded border border-gray-700">
//                 Next
//               </button>
//             </div>
//           </div>
