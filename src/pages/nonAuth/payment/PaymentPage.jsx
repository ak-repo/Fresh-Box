import {
  useUser,
  useCart,
  useToast,
} from "../../../ContextAPI/ContextCreater&Hook";
import { useOrder } from "../../../ContextAPI/ContextCreater&Hook";

import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { cart } = useCart();
  const { addtoOrders } = useOrder();
  const { user } = useUser();
  const location = useLocation();
  const totalAmount = (location.state + 9.99 + 20.8).toFixed(2);
  const navigate = useNavigate();
  const { toastSuccess } = useToast();

  const handleAddToOrders = () => {
    addtoOrders(cart, totalAmount, user?.address); // sharing current cart and total amount
    toastSuccess("✅ Payment received! Thank you for your purchase. ");
    navigate("/paymentSuccess");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Payment Form */}
          <div className="md:w-2/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="flex space-x-4 mb-6">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                  Credit Card
                </button>
                <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">
                  PayPal
                </button>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToOrders}
                  className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md cursor-pointer"
                >
                  Pay
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart &&
                  cart.map((product) => (
                    <div key={product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-gray-500 text-sm">
                          Qty: {product?.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        Price: {product?.price * product?.quantity}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p>{location.state}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p>9.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p>20.80</p>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <p>Total</p>
                  <p>:{totalAmount}</p>
                </div>
              </div>
            </div>

            {user?.address && (
              <div className="mt-4 bg-white shadow rounded-lg p-6">
                <h3 className="font-medium mb-2">Delivery Information</h3>
                <p className="text-gray-600">{user?.address?.street}</p>
                <p className="text-gray-600">{user?.address?.city}</p>
                <p className="text-gray-600">
                  {user?.address?.state} - {user?.address?.pin}
                </p>
                <button className="mt-3 text-blue-600 text-sm font-medium">
                  Change address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
