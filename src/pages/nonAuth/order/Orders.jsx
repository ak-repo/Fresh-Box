import { useContext, useState } from 'react';
import { UserDataContext } from '../../../API/AuthContext';

export default function OrdersPage() {
  const { user } = useContext(UserDataContext);
  const [activeTab, setActiveTab] = useState('current');

  // Sample order data - replace with actual API calls
  const [orders, setOrders] = useState({
    current: [
      {
        id: 'ORD-789012',
        date: '2023-05-15',
        status: 'Shipped',
        items: [
          { name: 'Berry Smoothie', quantity: 2, price: 250, image: 'assets/smoothies/smoothie01.jpg' },
          { name: 'Acai Bowl', quantity: 1, price: 320, image: 'assets/breackfast-bow/breakfast-bows01.jpg' }
        ],
        total: 820,
        deliveryDate: '2023-05-18',
        trackingNumber: 'TRK78901234'
      }
    ],
    history: [
      {
        id: 'ORD-123456',
        date: '2023-04-10',
        status: 'Delivered',
        items: [
          { name: 'Green Detox Smoothie', quantity: 1, price: 280, image: 'assets/smoothies/smoothie02.jpg' },
          { name: 'Energy Bites', quantity: 3, price: 180, image: 'assets/Bites/bites01.jpg' }
        ],
        total: 820
      },
      {
        id: 'ORD-345678',
        date: '2023-03-05',
        status: 'Delivered',
        items: [
          { name: 'Tropical Smoothie', quantity: 2, price: 240, image: 'assets/smoothies/smoothie03.jpg' },
          { name: 'Granola Bowl', quantity: 1, price: 290, image: 'assets/breackfast-bow/breakfast-bows02.jpg' }
        ],
        total: 770
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-lg text-gray-600">
            {user ? `Welcome back, ${user.name}` : 'Your order history'}
          </p>
        </div>

        {/* Order Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'current' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Current Orders
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Order History
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {orders[activeTab].length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {orders[activeTab].map((order) => (
                <li key={order.id} className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-lg font-semibold">₹{order.total}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h4 className="text-md font-medium mb-4">Items</h4>
                    <ul className="space-y-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex">
                          <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p>₹{item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Tracking (for current orders) */}
                  {activeTab === 'current' && order.trackingNumber && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="text-md font-medium mb-2">Tracking Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Tracking Number</p>
                          <p className="font-medium">{order.trackingNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated Delivery</p>
                          <p className="font-medium">
                            {new Date(order.deliveryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Track Order
                      </button>
                    </div>
                  )}

                  {/* Reorder Button (for history) */}
                  {activeTab === 'history' && (
                    <div className="mt-6 border-t border-gray-200 pt-6 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                        Reorder
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900">
                No {activeTab === 'current' ? 'current' : 'past'} orders
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeTab === 'current' 
                  ? 'Your current orders will appear here' 
                  : 'Your order history will appear here'}
              </p>
              <div className="mt-6">
                <NavLink
                  to="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Browse Products
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}