import { useEffect, useState } from "react";
import { UserDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const userAPI = "http://localhost:3000/users";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  console.log(loading);

  // user data setting up

  const login = (userData) => setUser(userData);
  const register = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <UserDataContext.Provider
      value={{ user, setUser, login, logout, register }}
    >
      {!loading && children}
    </UserDataContext.Provider>
  );
}
