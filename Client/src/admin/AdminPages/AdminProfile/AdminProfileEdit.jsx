import { FiSettings, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useUser, useToast } from "../../../ContextAPI/ContextCreater&Hook";

const AdminProfileEdit = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordForm, setShowPassword] = useState(false);
  const { user, infoUpdate, passwordChange } = useUser();

  const [editForm, setFormData] = useState({
    name: "",
    email: "",
    // mobile: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const { toastFail, toastSuccess } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        // mobile: user.address?.mobile || "",
      });
    }
  }, [user]);

  // handle the inpute changes
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //password

  // change input
  const handlePasswordChange = (e) => {
    const { value, name } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit change
  const submitPasswordChange = async () => {
    console.log(passwordForm);
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError({ newPassword: "Entered new passwords not matching" });
      return;
    }
    if (passwordForm.currentPassword !== user?.password) {
      setError({ currentPassword: "Entered current password not matching" });
      return;
    }

    const result = await passwordChange(passwordForm.newPassword);
    result
      ? toastSuccess("Password Changed Successfully")
      : toastFail("Failed to change password");
  };

  //cancel
  const cancelPasswordReset = () => {
    setShowPassword(false);
    setError({ newPassword: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-gray-800">
        {/* Edit Header */}
        <div className="bg-[#252525] px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <p className="text-gray-400 text-sm">
            Update your personal and account information
          </p>
        </div>

        {/* Edit Form */}
        <div className="p-6">
          <form className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
                Profile Picture
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-700 flex items-center justify-center text-2xl font-bold">
                    AD
                  </div>
                  <button className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-500 rounded-full p-2 shadow-md">
                    <FiSettings className="text-white" size={14} />
                  </button>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-400 text-sm mb-2">
                    Upload new photo (max 2MB)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      className="hidden"
                      id="profile-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Choose File
                    </label>
                    <button
                      type="button"
                      className="bg-[#1e1e1e] hover:bg-[#252525] text-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Information Section */}

            <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Name
                  </label>
                  <input
                    value={editForm.name}
                    name="name"
                    onClick={(e) => handleInfoChange(e)}
                    type="text"
                    className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    defaultValue="Admin"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">
                    Email
                  </label>
                  <input
                    value={editForm.email}
                    name="email"
                    onClick={(e) => handleInfoChange(e)}
                    type="email"
                    className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    defaultValue="admin@freshbox.com"
                  />
                </div>
              </div>
              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="bg-[#1e1e1e] cursor-pointer hover:bg-[#252525] text-gray-300 px-6 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 cursor-pointer hover:bg-emerald-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FiCheck size={16} />
                  Save Changes
                </button>
              </div>
            </div>

            {!showPasswordForm && (
              <button
                className="text-emerald-500"
                onClick={() => setShowPassword(true)}
              >
                Change password{" "}
              </button>
            )}
            {/* Password Reset Section */}
            {showPasswordForm && (
              <div className="bg-[#252525] p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
                  Password Reset
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        onChange={(e) => handlePasswordChange(e)}
                        name="currentPassword"
                        className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    {error.currentPassword && (
                      <p className="py-2 px-2 text-red-600">
                        {error.currentPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        name="newPassword"
                        onChange={(e) => handlePasswordChange(e)}
                        type={showNewPassword ? "text" : "password"}
                        className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    {/* <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiCheck size={12} className="text-emerald-500" />
                        <span>8+ characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck size={12} className="text-emerald-500" />
                        <span>1 uppercase</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck size={12} className="text-emerald-500" />
                        <span>1 number</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck size={12} className="text-emerald-500" />
                        <span>1 special char</span>
                      </div>
                    </div> */}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        onChange={(e) => handlePasswordChange(e)}
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    {error.newPassword && (
                      <p className="py-2 px-2 text-red-600">
                        {error.newPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3 mt-10">
                  <button
                    onClick={submitPasswordChange}
                    type="button"
                    className="px-4 py-2 bg-emerald-600 text-white cursor-pointer rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => cancelPasswordReset()}
                    type="button"
                    className="px-4 py-2 border border-gray-300 cursor-pointer rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;
