//  Key Rules for Consistency
// Main Content Padding: Always use p-6 in <main>.

// Card/Table Padding: Use p-6 for containers, py-4/px-4 for cells.

// Spacing Between Sections: mb-6 or mb-8 for vertical rhythm.

// Fixed Heights: Use h-64 (16rem) or h-80 (20rem) for charts.

// Grids: Stick to grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 for stats.

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import {
  useOrdersData,
  useProductsData,
  useUsersData,
  useRevenueData,
} from "../../adminControlls/AdminProviders&Hooks";
import { ViewModelComponent } from "../AdminOrder/AdminOrderPage";

import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiEye,
} from "react-icons/fi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashBord = () => {
  const { deliveredOrders, cancelledOrders, pendingOrders, ordersList } =
    useOrdersData();
  const { totalUsersCount, usersList } = useUsersData();

  const { totalRevenue } = useRevenueData();
  const { totalProductCount, productsList } = useProductsData();
  const [viewModel, setViewModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setViewModel(true);
    setSelectedOrder(order);
  };

  const data = {
    labels: ["Delivered", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [
          deliveredOrders?.length || 0,
          pendingOrders?.length || 0,
          cancelledOrders?.length || 0,
        ],
        backgroundColor: [
          "rgba(74, 222, 128, 0.8)", // Brighter green with opacity
          "rgba(250, 204, 21, 0.8)", // Brighter yellow with opacity
          "rgba(239, 68, 68, 0.8)", // Brighter red with opacity
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", // Makes the doughnut hole larger
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb", // Light gray text for better contrast
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f3f4f6",
        bodyColor: "#e5e7eb",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
    },
  };

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
                <p className="text-2xl font-bold mt-1">{totalUsersCount}</p>
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
                <p className="text-2xl font-bold mt-1">
                  ${totalRevenue.toFixed(2)}
                </p>
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
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold mt-1">{totalProductCount}</p>
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
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-100">
              Order Analytics
            </h3>
            {/* Add any additional controls or buttons here */}
          </div>
          <div className="h-80 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700 p-4">
            <div className="w-full h-full relative">
              <Doughnut data={data} options={options} />
              {/* Optional center text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Total Orders</p>
                  <p className="text-white text-2xl font-bold">
                    {deliveredOrders?.length +
                      pendingOrders?.length +
                      cancelledOrders?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {productsList &&
              productsList.slice(0, 6).map((item) => (
                <div key={item?.id} className="flex items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-md mr-3">
                    <img src={item?.image} alt="product-img" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Product {item?.title}</p>
                    <p className="text-xs text-gray-400">${item?.price}</p>
                  </div>
                  <div className="text-right">
                    {/* <p className="text-sm font-medium">{item * 25} sales</p>
                  <p className="text-xs text-green-400">+{item * 5}%</p> */}
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
          <NavLink
            to="ordersControls"
            className="text-emerald-500 hover:text-purple-300 text-sm"
          >
            View All Orders
          </NavLink>
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
              {ordersList &&
                ordersList.slice(ordersList.length - 5).map((order) => (
                  <tr
                    key={order?.orderId}
                    className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                  >
                    <td className="py-4 text-emerald-500">{order?.orderId}</td>
                    <td>{order?.userName}</td>
                    <td> {order?.orderedAt || "Not found"}</td>
                    <td>{order?.totalAmount?.totalCost}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full inline-block ${
                          order?.status === "delivered"
                            ? "bg-green-900 text-green-300"
                            : order?.status === "pending"
                            ? "bg-yellow-900 text-yellow-300"
                            : order?.status === "cancelled"
                            ? "bg-red-500 "
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {order?.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {viewModel && (
          <ViewModelComponent
            order={selectedOrder}
            setShowViewModal={setViewModel}
          />
        )}
      </section>

      {/* Recent Users and Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Users</h3>
            <NavLink
              to="userControls"
              className="text-emerald-500 hover:text-purple-300 text-sm"
            >
              View All Users
            </NavLink>
          </div>

          <div className="space-y-4">
            {usersList &&
              usersList.slice(usersList.length - 6).map((user) => (
                <div
                  key={user?.id}
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
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{user?.role}</p>
                    <span className="text-xs text-green-500">
                      {!user?.isBlock && <small>Active</small>}
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
