


const AdminSettingsPage = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      {/* Header - Same as dashboard */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Same as dashboard */}

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6">System Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden">
                {[
                  "General",
                  "Store",
                  "Payment",
                  "Shipping",
                  "Tax",
                  "Email",
                  "Notifications",
                  "Security",
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-[#2e2e2e] ${
                      i === 0 ? "bg-[#2e2e2e] text-purple-400" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-6">General Settings</h3>

                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Store Name
                    </label>
                    <input
                      type="text"
                      className="bg-[#2e2e2e] w-full px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      defaultValue="My Awesome Store"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Store Email
                    </label>
                    <input
                      type="email"
                      className="bg-[#2e2e2e] w-full px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      defaultValue="contact@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Store Currency
                    </label>
                    <select className="bg-[#2e2e2e] w-full px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Timezone
                    </label>
                    <select className="bg-[#2e2e2e] w-full px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                      <option>(UTC) Coordinated Universal Time</option>
                      <option>(UTC-05:00) Eastern Time</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
