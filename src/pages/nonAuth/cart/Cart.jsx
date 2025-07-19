// Wishlist.jsx
import { useState } from "react";

export default function Wishlist() {
  const [items, setItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, purchased: false },
    { id: 2, name: "Smart Watch", price: 199.99, purchased: false },
    { id: 3, name: "Programming Book", price: 29.99, purchased: true },
  ]);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item = {
      id: Date.now(),
      name: newItem,
      price: parseFloat(newPrice) || 0,
      purchased: false,
    };

    setItems([...items, item]);
    setNewItem("");
    setNewPrice("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const togglePurchased = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const totalItems = items.length;
  const purchasedItems = items.filter((item) => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;
  const totalCost = items.reduce((sum, item) => sum + item.price, 0);
  const remainingCost = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        My Wishlist
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <p className="text-indigo-800 font-semibold">Total Items</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-green-800 font-semibold">Purchased</p>
          <p className="text-2xl font-bold">{purchasedItems}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-800 font-semibold">Remaining</p>
          <p className="text-2xl font-bold">{remainingItems}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-800 font-semibold">Remaining Cost</p>
          <p className="text-2xl font-bold">${remainingCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Item name"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Price (optional)"
            className="w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            step="0.01"
            min="0"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Item
          </button>
        </div>
      </form>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            Your wishlist is empty. Add some items!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg flex justify-between items-center ${
                item.purchased
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => togglePurchased(item.id)}
                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <h3
                    className={`font-medium ${
                      item.purchased
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      item.purchased ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
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
          ))
        )}
      </div>

      {/* Total */}
      {items.length > 0 && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg flex justify-between items-center">
          <span className="font-semibold text-indigo-800">Total Cost:</span>
          <span className="text-xl font-bold">${totalCost.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}
