import { useEffect, useState } from "react";
import { AdminUsersContext } from "../AdminProviders&Hooks";
import axios from "axios";
import { usersAPI } from "../../../api";

function AdminUsersProvider({ children }) {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [reupdate, setReupdate] = useState(false);
  const [search, setSearch] = useState("");

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
    console.log(searchList);
  }, [search]);

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
