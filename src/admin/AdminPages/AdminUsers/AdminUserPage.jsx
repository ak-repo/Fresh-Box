import { useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useUsersData } from "../../adminControlls/AdminProviders&Hooks";
import Pagination from "../common/Pagination";

const AdminUsersPage = () => {
  const {
    updateUserStatus,
    deleteUser,
    updateUserRole,
    search,
    setSearch,
    searchList,
  } = useUsersData();
  const [deleteModel, setDeleteModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [selectUser, setSelecteUser] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);

  const handleEditModel = (user) => {
    setEditModel(true);
    setSelecteUser(user);
  };

  //delete model
  const handleDeleteModel = (user) => {
    setSelecteUser(user);
    setDeleteModel(true);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col overflow-hidden bg-[#121212] text-gray-200">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="hidden md:flex items-center bg-[#2e2e2e] rounded px-3 py-2">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-64 text-sm"
              />
            </div>

            {/* <button className="bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-lg text-sm">
              Add New User
            </button> */}
          </div>

          {/* User Filters - unchanged */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 mb-6">
            {/* ... existing filter code ... */}
          </div>

          {/* Users Table */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full  min-h-[70vh]">
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
                  <DisplayUser
                    handleEditModel={handleEditModel}
                    handleDeleteModel={handleDeleteModel}
                    users={searchList}
                    start={start}
                    end={end}
                  />
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            list={searchList}
            setStart={setStart}
            setEnd={setEnd}
            pageSize={7}
          />
        </main>
      </div>
      {/* Edit User Modal */}
      {editModel && (
        <EditModelComponent
          user={selectUser}
          setEditModel={setEditModel}
          updateUserRole={updateUserRole}
          updateUserStatus={updateUserStatus}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModel && (
        <DeleteModalComponent
          deleteUser={deleteUser}
          setDeleteModel={setDeleteModel}
          user={selectUser}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;

const DisplayUser = ({
  users,
  handleDeleteModel,
  handleEditModel,
  start,
  end,
}) => {
  return (
    <>
      {users &&
        users.slice(start, end).map((user, index) => (
          <tr
            key={user?.id}
            className="border-b  bg-red-400 border-gray-800 hover:bg-[#2e2e2e]"
          >
            <td className="py-4 flex items-center ">
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
            {user?.role !== "admin" && (
              <td className="flex items-center space-x-2">
                {" "}
                <button
                  onClick={() => handleEditModel(user)}
                  className="p-2 rounded text-blue-400 hover:text-blue-300 cursor-pointer hover:bg-blue-900/30"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteModel(user)}
                  className="p-2 rounded text-red-400 hover:text-red-300 cursor-pointer hover:bg-red-900/30"
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
            )}
          </tr>
        ))}
    </>
  );
};
const DeleteModalComponent = ({ setDeleteModel, deleteUser, user }) => {
  const handleDelete = (userId) => {
    deleteUser(userId);
    setDeleteModel(false);
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-xl border border-gray-800 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete user{" "}
          <span className="font-semibold">{user?.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setDeleteModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(user?.id)}
            className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModelComponent = ({
  user,
  setEditModel,
  updateUserStatus,
  updateUserRole,
}) => {
  const [currentStatus, setCurrentStatus] = useState(
    user?.isBlocked ? true : false
  );
  const [currentRole, setCurrentRole] = useState(user?.role);

  // status
  const handleStatus = () => {
    setCurrentStatus(!currentStatus);
  };

  // handling edit -> status and role

  const handleEdit = () => {
    user?.role !== currentRole && updateUserRole(user, currentRole);
    user?.isBlocked !== currentStatus && updateUserStatus(user, currentStatus);
    setEditModel(false);
  };
  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>

        <div className="mb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center mr-3">
              <span className="text-sm"></span>
            </div>
            <div>
              <h4 className="font-semibold">{user?.name}</h4>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                {user?.status}
              </label>
              <div className="flex space-x-4">
                {currentStatus ? (
                  <button
                    onClick={handleStatus}
                    className="px-4 py-2 rounded-lg bg-red-500"
                  >
                    Blocked
                  </button>
                ) : (
                  <button
                    onClick={handleStatus}
                    className="px-4 py-2 rounded-lg bg-green-500 "
                  >
                    Active
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Role</label>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-[#2e2e2e] text-gray-200 w-full px-3 py-2 rounded-lg border border-gray-700"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setEditModel(false)}
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};


