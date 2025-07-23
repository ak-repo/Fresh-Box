import React, { useContext } from "react";
import { UserDataContext } from "../../../ContextAPI/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* Header with avatar */}
      <div className="bg-black text-white p-6 md:p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img
              className="h-20 w-20 rounded-full border-2 border-white"
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt={user?.name}
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-300">Member</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-100">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
        {/* Left column - Personal info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">
                    98765432110
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="text-sm font-medium text-gray-900 whitespace-pre-line">
                    <p className="text-gray-600">{user?.address?.street}</p>
                    <p className="text-gray-600">{user?.address?.city}</p>
                    <p className="text-gray-600">
                      {user?.address?.state} - {user?.address?.pin}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <div className="space-y-3">
              <div
                // key={index}
                className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">
                    "•••• •••• •••• 4242", "PayPal"
                  </span>
                </div>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Edit
                </button>
              </div>

              <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Right column - Preferences */}
        <div className="space-y-8">
          {/* Account preferences */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Newsletter
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive product updates and news
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">
                    Switch between light and dark theme
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Membership info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Membership</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-900">Active</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-gray-900">{user.date}</p>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
                  Upgrade Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="max-w-6xl mx-auto p-6 md:p-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/wishlist")}
            className="px-6 py-3 flex-1 max-w-xs mx-auto flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Wishlist</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-3 flex-1 max-w-xs mx-auto flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Cart</span>
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-3 flex-1 max-w-xs mx-auto flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
