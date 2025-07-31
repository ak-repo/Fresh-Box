import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useUser } from "../../../ContextAPI/ContextCreater&Hook";

const AdminProfilePage = () => {
  const { user } = useUser();
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-gray-800">
        {/* Profile Header */}
        <div className="bg-[#252525] px-6 py-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-gray-800">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-700 flex items-center justify-center text-3xl font-bold">
              AD
            </div>
            <button className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-500 rounded-full p-2 shadow-md">
              <FiSettings className="text-white" size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{user?.role}</h2>
            <p className="text-emerald-400 mb-2">Super Admin</p>
            <p className="text-gray-400 text-sm">
              Last login: Today at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <NavLink to="/admin/adminProfileEdit" end>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Edit Profile
            </button>
          </NavLink>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Personal Information */}
          <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Full Name
                </label>
                <p className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  {user?.name}
                </p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Email
                </label>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  {user?.email}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Phone
                </label>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  {user?.address?.mobile}
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
              Account Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Username
                </label>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  admin_user
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Role</label>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  {user?.role}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Account Created
                </label>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border border-gray-800">
                  {user?.createdAt}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white text-sm font-medium">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-gray-400 text-xs">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  Enable
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white text-sm font-medium">
                    Change Password
                  </h4>

                  <p className="text-gray-400 text-xs">
                    Last changed 3 months ago
                  </p>
                </div>
                <NavLink to="/admin/adminProfileEdit">
                  <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                    Change
                  </button>
                </NavLink>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white text-sm font-medium">
                    Login Activity
                  </h4>
                  <p className="text-gray-400 text-xs">
                    View recent login attempts
                  </p>
                </div>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
              System Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Admin ID</span>
                <span className="text-white text-sm">ADM-789456123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Access Level</span>
                <span className="text-white text-sm">Full Access</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">
                  Last System Update
                </span>
                <span className="text-white text-sm">
                  v2.5.1 - July 15, 2023
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Storage Used</span>
                <span className="text-white text-sm">1.2GB of 10GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
