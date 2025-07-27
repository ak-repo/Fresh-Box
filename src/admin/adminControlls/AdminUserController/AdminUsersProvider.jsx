import { useEffect, useState } from "react";
import { AdminUsersContext } from "../AdminProviders&Hooks";
import axios from "axios";
import { usersAPI } from "../../../api";

function AdminUsersProvider({ children }) {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [usersList, setUsersList] = useState([]);

  //fetching all users list
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(usersAPI);
      setUsersList(data);
    })();
  }, []);

  useEffect(() => {
    if (usersList && Array.isArray(usersList)) {
      setTotalUsersCount(usersList.length);
    }
  }, [usersList]); //  Dependency array updated

  return (
    <AdminUsersContext.Provider value={{ totalUsersCount, usersList }}>
      {children}
    </AdminUsersContext.Provider>
  );
}

export default AdminUsersProvider;
