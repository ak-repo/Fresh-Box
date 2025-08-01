import { FiDollarSign, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useRevenueData} from "../../adminControlls/AdminProviders&Hooks";
const AdminRevenuePage = () => {
  const{totalCost, totalRevenue} = useRevenueData();
  const revenueData = [
    { month: "Jan", revenue: 12500, profit: 8500, change: 12 },
    { month: "Feb", revenue: 15800, profit: 11200, change: 18 },
    { month: "Mar", revenue: 14200, profit: 9800, change: -5 },
    { month: "Apr", revenue: 18900, profit: 13200, change: 15 },
    { month: "May", revenue: 21000, profit: 14800, change: 22 },
    { month: "Jun", revenue: 19500, profit: 13800, change: 8 },
  ];

  return (
    <div className="p-6 bg-[#2e2e2e] text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiDollarSign className="mr-2" /> Revenue Analytics
        </h1>
        <select className="bg-[#1e1e1e] text-gray-200 px-3 py-2 rounded-lg border border-gray-700">
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64 bg-[#2e2e2e] rounded-lg flex items-center justify-center border border-gray-700">
            <p className="text-gray-400">Revenue Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="bg-[#2e2e2e] p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue}</p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <FiTrendingUp className="mr-1" /> 12% from last period
              </p>
            </div>
            <div className="bg-[#2e2e2e] p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-2xl font-bold">${totalRevenue-totalCost}</p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <FiTrendingUp className="mr-1" /> 8% from last period
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl p-4 border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-left">Month</th>
                <th className="pb-3 text-left">Revenue</th>
                <th className="pb-3 text-left">Profit</th>
                <th className="pb-3 text-left">Change</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-[#2e2e2e]"
                >
                  <td className="py-4">{data.month}</td>
                  <td className="py-4">${data.revenue.toLocaleString()}</td>
                  <td className="py-4">${data.profit.toLocaleString()}</td>
                  <td className="py-4">
                    <div
                      className={`flex items-center ${
                        data.change > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {data.change > 0 ? (
                        <FiTrendingUp className="mr-1" />
                      ) : (
                        <FiTrendingDown className="mr-1" />
                      )}
                      {Math.abs(data.change)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenuePage;
