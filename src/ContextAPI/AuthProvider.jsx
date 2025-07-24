import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "./ContextsCreate";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "./ContextsCreate";

export const userAPI = "http://localhost:3000/users";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toastSuccess } = useContext(ToastContext);

  //cheching user in local storage
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setLoading(false);
  }, []);

  // adding and removing user data from local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // user data setting up

  const login = (userData) => setUser(userData);
  const register = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);

    toastSuccess(" 👋 You’ve been logged out. See you soon!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <UserDataContext.Provider
      value={{ user, setUser, login, logout, register, userAPI }}
    >
      {!loading && children}
    </UserDataContext.Provider>
  );
}
