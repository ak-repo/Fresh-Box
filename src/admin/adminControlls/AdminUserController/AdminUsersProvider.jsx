import { useEffect, useState } from "react";
import { AdminUsersContext } from "../AdminProviders&Hooks";
import axios from "axios";
import { usersAPI } from "../../../api";
import { useToast } from "../../../ContextAPI/ContextCreater&Hook";

function AdminUsersProvider({ children }) {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [reupdate, setReupdate] = useState(false);
  const [search, setSearch] = useState("");
  const { toastFail, toastSuccess } = useToast();

  //fetching all users list
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(usersAPI);
        setUsersList(data);
        setSearchList(data);
      } catch (error) {
        console.log("Error while fetching userList", error.message);
      }
    })();
  }, [reupdate]);

  //updaing users total length.
  useEffect(() => {
    if (usersList && Array.isArray(usersList)) {
      setTotalUsersCount(usersList.length);
    }
  }, [usersList]); //  Dependency array updated

  //serach
  useEffect(() => {
    console.log(search);
    setSearchList(
      usersList.filter((user) =>
        user?.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const usersPatchWork = async (user, change) => {
    if (user?.id) {
      try {
        await axios.patch(`${usersAPI}/${user.id}`, change);
        setReupdate(!reupdate);
      } catch (error) {
        console.log("error while updating user info", error.message);
        toastFail("Failed to update user details.");
      }
    }
  };

  //update user status
  const updateUserStatus = (user, currentStatus) => {
    usersPatchWork(user, { isBlocked: currentStatus });
  };

  const updateUserRole = async (user, currentRole) => {
    usersPatchWork(user, { role: currentRole });
    toastSuccess("User role updated successfully.");
  };

  // delete user
  const deleteUser = async (userID) => {
    if (userID) {
      try {
        await axios.delete(`${usersAPI}/${userID}`);
        setReupdate(!reupdate);
        toastSuccess("User deleted successfully.");
      } catch (error) {
        console.log("error while deleting user", error.message);
      }
    }
  };

  return (
    <AdminUsersContext.Provider
      value={{
        totalUsersCount,
        usersList,
        updateUserStatus,
        deleteUser,
        updateUserRole,
        reupdate,
        setReupdate,
        search,
        setSearch,
        searchList,
      }}
    >
      {children}
    </AdminUsersContext.Provider>
  );
}

export default AdminUsersProvider;

//
