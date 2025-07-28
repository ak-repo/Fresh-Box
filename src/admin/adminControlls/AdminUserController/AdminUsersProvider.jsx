import { useEffect, useState } from "react";
import { AdminUsersContext } from "../AdminProviders&Hooks";
import axios from "axios";
import { usersAPI } from "../../../api";

function AdminUsersProvider({ children }) {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [reupdate, setReupdate] = useState(false);

  //fetching all users list
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(usersAPI);
      setUsersList(data);
    })();
  }, [reupdate]);

  //updaing users total length.
  useEffect(() => {
    if (usersList && Array.isArray(usersList)) {
      setTotalUsersCount(usersList.length);
    }
  }, [usersList]); //  Dependency array updated

  const usersPatchWork = (user, change) => {
    if (user?.id) {
      axios
        .patch(`${usersAPI}/${user.id}`, change)
        .then(() => setReupdate(!reupdate))
        .catch((error) => console.log(error.message));
    }
  };

  //update user status
  const updateUserStatus = (user, currentStatus) => {
    usersPatchWork(user, { isBlocked: currentStatus });
  };

  const updateUserRole = async (user, currentRole) => {
    usersPatchWork(user, { role: currentRole });
  };

  // delete user
  const deleteUser = async (userID) => {
    if (userID) {
      await axios
        .delete(`${usersAPI}/${userID}`)
        .then(() => setReupdate(!reupdate))
        .catch((error) => console.log(error.message));
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
      }}
    >
      {children}
    </AdminUsersContext.Provider>
  );
}

export default AdminUsersProvider;

//
