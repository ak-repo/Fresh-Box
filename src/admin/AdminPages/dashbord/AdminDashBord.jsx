//  Key Rules for Consistency
// Main Content Padding: Always use p-6 in <main>.

// Card/Table Padding: Use p-6 for containers, py-4/px-4 for cells.

// Spacing Between Sections: mb-6 or mb-8 for vertical rhythm.

// Fixed Heights: Use h-64 (16rem) or h-80 (20rem) for charts.

// Grids: Stick to grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 for stats.

import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiEye,
  FiPrinter,
} from "react-icons/fi";

const AdminDashBord = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Dashboard Overview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <select className="bg-[#2e2e2e] border border-gray-700 rounded-lg px-3 py-2 text-sm">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold mt-1">2,453</p>
                <p className="text-green-400 text-xs mt-2">
                  +8% from last month
                </p>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-lg h-fit">
                <FiUsers size={24} className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">$45,231</p>
                <p className="text-green-400 text-xs mt-2">
                  +18% from last month
                </p>
              </div>
              <div className="bg-purple-900/30 p-3 rounded-lg h-fit">
                <FiDollarSign size={24} className="text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-1">1,234</p>
                <p className="text-green-400 text-xs mt-2">
                  +12% from last month
                </p>
              </div>
              <div className="bg-green-900/30 p-3 rounded-lg h-fit">
                <FiShoppingCart size={24} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1">3.6%</p>
                <p className="text-green-400 text-xs mt-2">
                  +1.2% from last month
                </p>
              </div>
              <div className="bg-yellow-900/30 p-3 rounded-lg h-fit">
                <FiTrendingUp size={24} className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales Analytics</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-emerald-500 rounded">
                Week
              </button>
              <button className="px-3 py-1 text-xs bg-[#2e2e2e] rounded">
                Month
              </button>
              <button className="px-3 py-1 text-xs bg-[#2e2e2e] rounded">
                Year
              </button>
            </div>
          </div>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-800">
            <p className="text-gray-400">Line Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center">
                <div className="w-10 h-10 bg-gray-700 rounded-md mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product {item}</p>
                  <p className="text-xs text-gray-400">
                    ${(item * 99).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item * 25} sales</p>
                  <p className="text-xs text-green-400">+{item * 5}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button className="text-emerald-500 hover:text-purple-300 text-sm">
            View All Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#ORD-0241",
                  customer: "Alex Johnson",
                  date: "2023-04-15",
                  amount: "$199.99",
                  status: "Completed",
                },
                {
                  id: "#ORD-0240",
                  customer: "Maria Garcia",
                  date: "2023-04-14",
                  amount: "$450.00",
                  status: "Shipped",
                },
                {
                  id: "#ORD-0239",
                  customer: "David Kim",
                  date: "2023-04-13",
                  amount: "$120.50",
                  status: "Processing",
                },
                {
                  id: "#ORD-0238",
                  customer: "Sarah Williams",
                  date: "2023-04-12",
                  amount: "$89.99",
                  status: "Pending",
                },
              ].map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                >
                  <td className="py-4 text-emerald-500">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Completed"
                          ? "bg-green-900 text-green-300"
                          : order.status === "Shipped"
                          ? "bg-blue-900 text-blue-300"
                          : order.status === "Processing"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-blue-400 hover:text-blue-300 mr-3">
                      <FiEye size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-300">
                      <FiPrinter size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Users and Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Users</h3>
            <button className="text-emerald-500 hover:text-purple-300 text-sm">
              View All Users
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Alex Johnson",
                email: "alex@example.com",
                role: "Admin",
                status: "Active",
              },
              {
                name: "Maria Garcia",
                email: "maria@example.com",
                role: "Customer",
                status: "Active",
              },
              {
                name: "David Kim",
                email: "david@example.com",
                role: "Customer",
                status: "Inactive",
              },
              {
                name: "Sarah Williams",
                email: "sarah@example.com",
                role: "Editor",
                status: "Active",
              },
            ].map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-[#2e2e2e] rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                    <span className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{user.role}</p>
                  <span
                    className={`text-xs ${
                      user.status === "Active"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <button className="text-emerald-500 hover:text-purple-300 text-sm">
              View All Activity
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                action: "New order placed",
                user: "Alex Johnson",
                time: "2 mins ago",
              },
              {
                action: "Product updated",
                user: "Sarah Williams",
                time: "1 hour ago",
              },
              {
                action: "User registered",
                user: "Maria Garcia",
                time: "3 hours ago",
              },
              {
                action: "Settings changed",
                user: "Admin User",
                time: "5 hours ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start p-3 hover:bg-[#2e2e2e] rounded-lg"
              >
                <div className="w-2 h-2 bg-emratext-emerald-500 rounded-full mt-2 mr-3"></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">
                    By {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashBord;
