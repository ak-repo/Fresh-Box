import { useEffect, useState } from "react";

import { usersAPI } from "../../api";
import { loginUser } from "./LoginController";
import { registerNewUser } from "./RegistrationController";
import { UserDataContext } from "../ContextCreater&Hook";

import axios from "axios";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [registrationForm, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    address: {
      mobile: " ",
      street: "",
      city: "",
      state: "",
      pin: "",
    },
    isBlock: false,
    cart: [],
    orders: [],
    wishlist: [],
    orderHistory: [],
    created_at: new Date().toISOString(),
  });

  // Fetch all users once
  useEffect(() => {
    axios.get(usersAPI).then((res) => setUserList(res.data));
  }, []);

  // Check localStorage for existing user
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setLoading(false);
  }, []);

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Simple form validation
  const formValidation = (formData) => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      validationErrors.email = "Email is invalid";
    if (!formData.password) validationErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Must contain 8+ chars, 1 uppercase, 1 number, 1 special char";
    }
    setError(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // login function call
  const login = async (userData) => {
    const user = await loginUser(userData);
    if (user) {
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  //registration function call
  const register = async (userData) => {
    const success = await registerNewUser(userData);
    success ? true : false;
  };

  //logout
  const logout = () => setUser(null);

  // checking anything common in users
  function userChecker(check, data) {
    console.log(check, data);
    if (userList) {
      const existing = userList.some((user) => user[check] === data);
      return existing ? false : true;
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        register,
        formValidation,
        userList,
        registrationForm,
        setFormData,
        userChecker,
        error,
      }}
    >
      {!loading && children}
    </UserDataContext.Provider>
  );
}
