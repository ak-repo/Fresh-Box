import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUsersData } from "../../adminControlls/AdminProviders&Hooks";

const AdminUsersPage = () => {
  const { usersList, updateUserStatus, deleteUser, updateUserRole } =
    useUsersData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteUser(selectedUser.id);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const saveChanges = () => {
    // Update both status and role if changed
    if (selectedUser) {
      updateUserStatus(selectedUser.id, selectedUser.isBlocked);
      updateUserRole(selectedUser.id, selectedUser.role);
    }
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <button className="bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-lg text-sm">
              Add New User
            </button>
          </div>

          {/* User Filters - unchanged */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 mb-6">
            {/* ... existing filter code ... */}
          </div>

          {/* Users Table */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList &&
                    usersList.map((user, index) => (
                      <tr
                        key={user?.id}
                        className="border-b border-gray-800 hover:bg-[#2e2e2e]"
                      >
                        <td className="py-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center mr-3">
                            <span className="text-xs">{index + 1}</span>
                          </div>
                          <span>{user?.name}</span>
                        </td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                        <td>
                          <span
                            className={`py-1 px-3 rounded-full text-sm ${
                              user.isBlocked
                                ? "bg-red-800 text-gray-300"
                                : "bg-green-800 text-gray-300"
                            }`}
                          >
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td>
                          {user?.createdAt &&
                            new Date(user.createdAt)
                              .toLocaleDateString("en-GB")
                              .replaceAll("/", "-")}
                        </td>
                        <td className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 rounded text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="p-2 rounded text-red-400 hover:text-red-300 hover:bg-red-900/30"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>

            <div className="mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center mr-3">
                  <span className="text-sm">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Status
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        setSelectedUser({ ...selectedUser, isBlocked: false })
                      }
                      className={`px-4 py-2 rounded-lg ${
                        !selectedUser.isBlocked
                          ? "bg-green-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() =>
                        setSelectedUser({ ...selectedUser, isBlocked: true })
                      }
                      className={`px-4 py-2 rounded-lg ${
                        selectedUser.isBlocked
                          ? "bg-red-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      Blocked
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Role
                  </label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete user{" "}
              <span className="font-semibold">{selectedUser?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
