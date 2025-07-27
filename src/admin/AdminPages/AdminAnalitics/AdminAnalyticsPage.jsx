import {
  FiPieChart,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";

const AdminAnalyticsPage = () => {
  const metrics = [
    {
      icon: <FiUsers size={24} />,
      title: "Total Visitors",
      value: "24,532",
      change: "+12%",
      trend: "up",
    },
    {
      icon: <FiShoppingCart size={24} />,
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trend: "up",
    },
    {
      icon: <FiDollarSign size={24} />,
      title: "Avg. Order Value",
      value: "$89.42",
      change: "+5%",
      trend: "up",
    },
    {
      icon: <FiUsers size={24} />,
      title: "Returning Customers",
      value: "32%",
      change: "+4%",
      trend: "up",
    },
  ];

  return (
    <div className="p-6 bg-[#2e2e2e] text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiPieChart className="mr-2" /> Business Analytics
        </h1>
        <select className="bg-[#1e1e1e] text-gray-200 px-3 py-2 rounded-lg border border-gray-700">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#2e2e2e] text-purple-400">
                {metric.icon}
              </div>
            </div>
            <p
              className={`mt-4 text-sm ${
                metric.trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {metric.change} from last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700">
            <p className="text-gray-400">Pie Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">User Acquisition</h2>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700">
            <p className="text-gray-400">Line Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-left">Product</th>
                <th className="pb-3 text-left">Category</th>
                <th className="pb-3 text-left">Sales</th>
                <th className="pb-3 text-left">Revenue</th>
                <th className="pb-3 text-left">Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-[#2e2e2e]">
                <td className="py-4">Premium Headphones</td>
                <td className="py-4 text-gray-400">Electronics</td>
                <td className="py-4">324</td>
                <td className="py-4">$64,476</td>
                <td className="py-4 text-green-400">4.8%</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-[#2e2e2e]">
                <td className="py-4">Smart Watch</td>
                <td className="py-4 text-gray-400">Wearables</td>
                <td className="py-4">287</td>
                <td className="py-4">$71,463</td>
                <td className="py-4 text-green-400">4.2%</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-[#2e2e2e]">
                <td className="py-4">Wireless Keyboard</td>
                <td className="py-4 text-gray-400">Accessories</td>
                <td className="py-4">256</td>
                <td className="py-4">$22,784</td>
                <td className="py-4 text-green-400">3.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
