import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../ContextAPI/ContextCreater&Hook";

export default function OrdersPage() {
  // const [currentOrder, setCurrentOrders] = useState();
  // const { user } = useContext(UserDataContext);
  const [activeTab, setActiveTab] = useState("current");
  const { orders } = useOrder();
  const navigarte = useNavigate();
  // | Status       | Meaning                            |
  // | ------------ | ---------------------------------- |
  // | `pending`    | Order placed but not processed yet |
  // | `processing` | Being prepared/packed              |
  // | `shipped`    | Dispatched from warehouse          |
  // | `delivered`  | Delivered to customer              |
  // | `cancelled`  | Order was cancelled                |
  // | `returned`   | Customer returned the order        |

  //classification
  const currentOrder = orders
    .filter((item) =>
      ["pending", `processing`, `shipped`].includes(item?.status)
    )
    .reverse();
  const orderHistory = orders
    .filter((item) =>
      [`delivered`, `cancelled`, `returned`].includes(item?.status)
    )
    .reverse();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8  ">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-lg text-gray-600">Your order history</p>
          <div className="mt-3 h-1 w-16 bg-emerald-700 mx-auto rounded-full"></div>
        </div>

        {/* Order Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white shadow-xs rounded-md p-0.5 border border-gray-200">
            <button
              className={`px-6 py-2 rounded-md text-xs font-medium bg-${
                activeTab === "current" ? "black" : "white"
              } text-${activeTab === "current" ? "white" : "black"}`}
              onClick={() => setActiveTab("current")}
            >
              Current
            </button>
            <button
              className={`px-6 py-2 rounded-md text-xs font-medium bg-${
                activeTab === "history" ? "black" : "white"
              } text-${activeTab === "history" ? "white" : "black"}`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {activeTab === "current" ? (
            currentOrder.length === 0 ? (
              <EmptyOrder />
            ) : (
              <CurrentOrder currentOrder={currentOrder} navigarte={navigarte} />
            )
          ) : orderHistory.length === 0 ? (
            <EmptyOrder />
          ) : (
            <OrderHistory orderHistory={orderHistory} navigarte={navigarte} />
          )}
        </div>
      </div>
    </div>
  );
}

const CurrentOrder = ({ currentOrder, navigarte }) => {
  return (
    <>
      {currentOrder &&
        currentOrder.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {order.orderId}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order?.orderedAt}
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              {order?.items &&
                order.items.map((product) => (
                  <div
                    className="flex items-start space-x-3 p-2"
                    key={crypto.randomUUID()}
                  >
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        onClick={() =>
                          navigarte(`/productDetails/${product.id}`)
                        }
                        src={product.image}
                        alt="product"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-bold">
                    ₹{order.totalAmount?.totalCost}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <button
                  onClick={() => navigarte("/orderMaintain", { state: order })}
                  className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Track
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const OrderHistory = ({ orderHistory, navigarte }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {orderHistory &&
        orderHistory.map((order) => (
          <>
            {" "}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {order.orderId}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {order.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {order?.items &&
                  order.items.map((product) => (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                        <img
                          onClick={() =>
                            navigarte(`/productDetails/${product.id}`)
                          }
                          src={product.image}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {product.quantity}
                        </p>
                        {/* <p className="text-sm font-semibold mt-1">₹</p> */}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-bold">
                    ₹{order.totalAmount?.totalCost}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Invoice
                </button>
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-700 rounded-md text-white hover:bg-emerald-900">
                  Buy Again
                </button>
                {order?.status === "delivered" && (
                  <button className="px-3 py-1.5 text-xs font-medium bg-emerald-700 rounded-md text-white hover:bg-emerald-900">
                    Return
                  </button>
                )}
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

const EmptyOrder = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-100">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">No orders yet</h3>
      <p className="text-xs text-gray-500 mb-3">Your orders will appear here</p>
      <button className="px-4 py-2 text-xs font-medium bg-emerald-700 rounded-md text-white hover:bg-emerald-900">
        Start Shopping
      </button>
    </div>
  );
};
