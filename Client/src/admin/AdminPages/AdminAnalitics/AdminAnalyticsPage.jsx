import {
  FiPieChart,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiBox,
} from "react-icons/fi";

const AdminAnalyticsPage = () => {
  const categories = [
    {
      name: "Smoothie",
      slug: "smoothie",
      products: 124,
      status: "Active",
    },
    {
      name: "Bites",
      slug: "bites",
      products: 89,
      status: "Active",
    },
    {
      name: "Breakfast Bowls",
      slug: "breakfast-bowls",
      products: 56,
      status: "Active",
    },
    {
      name: "Pasta",
      slug: "pasta",
      products: 34,
      status: "Inactive",
    },
  ];

  // Calculate metrics based on category data
  const totalProducts = categories.reduce(
    (sum, category) => sum + category.products,
    0
  );
  const activeCategories = categories.filter(
    (cat) => cat.status === "Active"
  ).length;
  const inactiveCategories = categories.filter(
    (cat) => cat.status === "Inactive"
  ).length;

  const metrics = [
    {
      icon: <FiBox size={24} />,
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      change: "+12%",
      trend: "up",
    },
    {
      icon: <FiShoppingCart size={24} />,
      title: "Active Categories",
      value: activeCategories,
      change: "+2",
      trend: "up",
    },
    {
      icon: <FiDollarSign size={24} />,
      title: "Avg Products/Category",
      value: Math.round(totalProducts / categories.length),
      change: "+5%",
      trend: "up",
    },
    {
      icon: <FiUsers size={24} />,
      title: "Inactive Categories",
      value: inactiveCategories,
      change: "-1",
      trend: "down",
    },
  ];

  return (
    <div className="p-6 bg-[#2e2e2e] text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiPieChart className="mr-2" /> Category Analytics
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
            <div className="mt-4 flex items-center text-sm">
              <span
                className={`mr-1 ${
                  metric.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
              </span>
              <span
                className={
                  metric.trend === "up" ? "text-green-400" : "text-red-400"
                }
              >
                {metric.change} from last period
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700">
            <p className="text-gray-400">Bar Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">
            Category Status Distribution
          </h2>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700">
            <p className="text-gray-400">Pie Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Category Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-left">Category</th>
                <th className="pb-3 text-left">Status</th>
                <th className="pb-3 text-left">Products</th>
                <th className="pb-3 text-left">Market Share</th>
                <th className="pb-3 text-left">Trend</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                const marketShare = (
                  (category.products / totalProducts) *
                  100
                ).toFixed(1);
                const isActive = category.status === "Active";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-[#2e2e2e]"
                  >
                    <td className="py-4 capitalize">{category.name}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          isActive
                            ? "bg-green-900 text-green-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="py-4">{category.products}</td>
                    <td className="py-4">{marketShare}%</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        {isActive ? (
                          <>
                            <FiTrendingUp className="text-green-400 mr-1" />
                            <span className="text-green-400">
                              +{Math.floor(Math.random() * 5) + 1}%
                            </span>
                          </>
                        ) : (
                          <>
                            <FiTrendingDown className="text-red-400 mr-1" />
                            <span className="text-red-400">
                              -{Math.floor(Math.random() * 5) + 1}%
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
