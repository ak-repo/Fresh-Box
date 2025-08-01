import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderMaintainPage() {
  const [showCancelView, setCancelView] = useState(false);
  const [order, setOrder] = useState({});
  const location = useLocation();
  const navigarte = useNavigate();
  useEffect(() => {
    if (location.state) {
      setOrder(location.state || {});
    }
  }, []);
  console.log(order);

  // cancel view handler
  const handleCancelView = () => {
    setCancelView(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigarte(-1)}
            className="flex items-center text-sm text-emerald-600 hover:text-emerald-800"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Orders
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Order Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {order?.orderId}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {order?.orderedAt}
                </p>
              </div>
              <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {order?.status}
              </span>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Order Status
            </h4>
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-emerald-500"
                      aria-hidden="true"
                    ></span>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-emerald-500 text-white">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-emerald-500">Ordered</p>
                          <p className="text-xs text-gray-500">
                            Your order has been received
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          Jan 1, 10:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-emerald-500"
                      aria-hidden="true"
                    ></span>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-emerald-500 text-white">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-emerald-500">Confirmed</p>
                          <p className="text-xs text-gray-500">
                            Seller has confirmed your order
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          Jan 1, 11:30 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-500 text-white">
                          3
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-blue-500 font-medium">
                            Processed{" "}
                            <span className="font-medium text-gray-900">
                              (Current)
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            Seller is preparing your order
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-200 text-gray-500">
                          4
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">Shipped</p>
                          <p className="text-xs text-gray-500">
                            Your item has been shipped
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-200 text-gray-500">
                          5
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Out for Delivery
                          </p>
                          <p className="text-xs text-gray-500">
                            Your item is on its way to you
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Order Items
            </h4>
            <div className="space-y-6">
              {order?.items &&
                order?.items.map((item) => (
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        className="w-20 h-20 rounded-md object-cover border border-gray-200"
                        src={item?.image}
                        alt="Product"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h5 className="text-sm font-medium text-gray-900">
                          {item?.title}
                        </h5>
                        <p className="text-sm font-medium text-gray-900">
                          {item?.price}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item?.quantity}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">SKU: XYZ789</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Shipping Address
                </h5>
                <address className="text-sm text-gray-500 not-italic">
                  {order?.userName}
                  <br />
                  {order?.shippingAddress?.street}
                  <br />
                  {order?.shippingAddress?.city}
                  <br />
                  {order?.shippingAddress?.state}
                  <br />
                  Phone:{order?.shippingAddress?.mobile}
                </address>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Payment Method
                </h5>
                <p className="text-sm text-gray-500">
                  Credit Card (•••• •••• •••• 4242)
                  <br />
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Subtotal</span>
                <span>₹{order?.totalAmount?.itemCost}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Tax</span>
                <span>
                  ₹
                  {(
                    order?.totalAmount?.totalCost - order?.totalAmount?.itemCost
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{order?.totalAmount?.totalCost}</span>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={handleCancelView}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {showCancelView && <CancellationModel setCancelView={setCancelView} />}
    </div>
  );
}

export default OrderMaintainPage;

const CancellationModel = ({ setCancelView }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-400 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Cancel Order #12345
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to cancel this order?
        </p>

        <div className="mb-4">
          <label
            htmlFor="cancelReason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for cancellation
          </label>
          <select
            id="cancelReason"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select a reason</option>
            <option value="changed-mind">Changed my mind</option>
            <option value="found-cheaper">Found cheaper elsewhere</option>
            <option value="delivery-time">Delivery time too long</option>
            <option value="other">Other reason</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="otherReason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Please specify
          </label>
          <textarea
            id="otherReason"
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="Enter your reason here..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setCancelView(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Go Back
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-red-600 hover:bg-red-700">
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};
