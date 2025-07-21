import { useState } from "react";
import {useCartController} from "../../../customHooks/useCartController";

export default function Cart() {
  const cart = []
  // const { cart, addToCart, removeFromCart } = useCartController();
  // console.log(cart);
  // // console.log(cart);
  // const [items, setItems] = useState([
  //   { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1 },
  //   { id: 2, name: "Smart Watch", price: 199.99, quantity: 1 },
  //   { id: 3, name: "Programming Book", price: 29.99, quantity: 2 },
  // ]);
  // const [newItem, setNewItem] = useState("");
  // const [newPrice, setNewPrice] = useState("");

  // // const addItem = (e) => {
  // //   e.preventDefault();
  // //   if (!newItem.trim() || isNaN(newPrice)) return;

  // //   const item = {
  // //     id: Date.now(),
  // //     name: newItem,
  // //     price: parseFloat(newPrice) || 0,
  // //     quantity: 1,
  // //   };

  // //   setItems([...items, item]);
  // //   setNewItem("");
  // //   setNewPrice("");
  // // };

  // const removeItem = (id) => {
  //   setItems(items.filter((item) => item.id !== id));
  // };

  // const updateQuantity = (id, change) => {
  //   setItems(
  //     items.map((item) => {
  //       if (item.id === id) {
  //         const newQuantity = item.quantity + change;
  //         return {
  //           ...item,
  //           quantity: newQuantity > 0 ? newQuantity : 1,
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  // const totalCost = items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        My Shopping Cart
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-indigo-800 font-semibold">Total Items</p>
          {/* <p className="text-2xl font-bold">{totalItems}</p> */}
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-semibold">Total Cost</p>
          {/* <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p> */}
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-3">
        {cart && cart.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            Your cart is empty. Add some items!
          </p>
        ) : (
          cart &&
          cart.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-lg font-semibold text-indigo-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    // onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    // onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  // onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart && cart.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <p className="text-xl font-bold text-indigo-700">
              {/* ${totalCost.toFixed(2)} */}
            </p>
          </div>
          <button className="w-full mt-4 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
