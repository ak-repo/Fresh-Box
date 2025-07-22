import { useOrderController } from "../../../customHooks/useOrderController";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const { orders } = useOrderController();
  const orderDetails = orders[orders.length - 1];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Confirmation Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your order {orderDetails?.orderId} has
            been received.
          </p>
          <p className="mt-2 text-gray-600">
            We've sent a confirmation email with your order details.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              {orderDetails?.items &&
                orderDetails.items.map((product) => (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200 bg-gray-100">
                        <img src={product?.image} alt="product-image" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product?.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {product?.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {product?.price}
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>{(orderDetails?.totalAmount - 9.99 - 20.8).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>Shipping</p>
                <p>$9.99</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>Tax</p>
                <p>$20.80</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>{orderDetails?.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Shipping Information */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Shipping Information
              </h2>
            </div>

            <div className="px-6 py-5">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {orderDetails?.shippingAddress?.street}
                </p>
                <p className="text-sm text-gray-600">
                  {orderDetails?.shippingAddress?.city},{" "}
                  {orderDetails?.shippingAddress?.pin}
                </p>
                <p className="text-sm text-gray-600">
                  {orderDetails?.shippingAddress?.state}, India
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  Shipping Method
                </p>
                <p className="text-sm text-gray-600 mt-1">Standard Shipping</p>
                <p className="text-sm text-gray-500 mt-1">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Payment Information
              </h2>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  Payment Method
                </p>
                <p className="text-sm text-gray-600">VISA ending in 4242</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  Billing Address
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Same as shipping address
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              What's Next?
            </h2>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Order confirmation sent
                  </p>
                  <p className="text-sm text-gray-500">
                    We've sent a confirmation email with your order details to
                    your registered email address.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
                  <div className="h-3 w-3 rounded-full bg-gray-400 animate-pulse"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Preparing your order
                  </p>
                  <p className="text-sm text-gray-500">
                    Your order is being processed and will be shipped soon.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-gray-300 mt-0.5">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    On its way
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll notify you when your order has shipped with tracking
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
