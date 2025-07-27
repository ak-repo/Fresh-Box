import { FiEdit, FiTrash2, FiGrid } from "react-icons/fi";

const AdminCategoriesPage = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      {/* Header - Same as dashboard */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Same as dashboard */}

        {/* Categories Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Category Management</h2>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
              Add New Category
            </button>
          </div>

          {/* Categories Table */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Slug</th>
                    <th className="pb-3 font-medium">Products</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Electronics",
                      slug: "electronics",
                      products: 124,
                      status: "Active",
                    },
                    {
                      name: "Clothing",
                      slug: "clothing",
                      products: 89,
                      status: "Active",
                    },
                    {
                      name: "Home & Garden",
                      slug: "home-garden",
                      products: 56,
                      status: "Active",
                    },
                    {
                      name: "Toys",
                      slug: "toys",
                      products: 34,
                      status: "Inactive",
                    },
                  ].map((category, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                    >
                      <td className="py-4 flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-md mr-3 flex items-center justify-center">
                          <FiGrid size={16} />
                        </div>
                        <span>{category.name}</span>
                      </td>
                      <td className="text-gray-400">{category.slug}</td>
                      <td>{category.products}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            category.status === "Active"
                              ? "bg-green-900 text-green-300"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-blue-400 hover:text-blue-300 mr-3">
                          <FiEdit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-400">
                Showing 1 to 4 of 12 categories
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded border border-gray-700">
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-purple-600">1</button>
                <button className="px-3 py-1 rounded border border-gray-700">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
