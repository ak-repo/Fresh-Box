// Wishlist.jsx
import { useState } from "react";

const Wishlist = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99 },
    { id: 2, name: "Smart Watch", price: 199.99 },
    { id: 3, name: "Programming Book", price: 29.99 },
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
    };

    setItems([...items, item]);
    setNewItem("");
    setNewPrice("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">My Wishlist</h1>
        <p className="text-gray-500">Add items you'd love to have</p>
      </div>

      {/* Add Item Form */}
      <form
        onSubmit={addItem}
        className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="item"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item name
            </label>
            <input
              type="text"
              id="item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="What do you wish for?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price (optional)
            </label>
            <input
              type="number"
              id="price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Approximate cost"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              step="0.01"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Add to Wishlist
          </button>
        </div>
      </form>

      {/* Wishlist Items */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              No items yet
            </h3>
            <p className="mt-1 text-gray-400">Add your first wish above</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                {item.price > 0 && (
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-pink-500 transition-colors p-1 -mr-2"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
