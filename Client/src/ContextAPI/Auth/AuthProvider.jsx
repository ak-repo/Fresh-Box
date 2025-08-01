import { useEffect, useState } from "react";

import { usersAPI } from "../../api";
import { UserDataContext } from "../ContextCreater&Hook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [registrationForm, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    address: {
      mobile: "",
      street: "",
      city: "",
      state: "",
      pin: "",
    },
    isBlock: false,
    isDelete: false,
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

  //login
  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.get(
        `${usersAPI}?email=${email}&password=${password}`
      );
      setUser(data[0]);
      return data[0];
    } catch (error) {
      console.log("Error while logging in user:", error.message);
      return null;
    }
  };

  // register
  const register = async (newData) => {
    try {
      await axios.post(usersAPI, newData);
      return true;
    } catch (error) {
      console.log("error while registraction,  ", error.message);
      return false;
    }
  };

  //logout
  const logout = () => {
    setUser(null);
  };
  const adminLogOut = () => {
    setUser(null);
    navigate("/login");
  };

  // checking anything common in users
  function userChecker(check, data) {
    console.log(check, data);
    if (userList) {
      const existing = userList.some((user) => user[check] === data);
      return existing ? false : true;
    }
  }

  // info update function
  const infoUpdate = async (newData) => {
    if (user?.id && newData) {
      try {
        const { data } = await axios.patch(`${usersAPI}/${user?.id}`, {
          ...user,
          ...newData,
        });
        setUser(data);
      } catch (error) {
        console.log("error while updating user info", error.message);
      }
    }
  };

  //password reset
  const passwordChange = async (newPassword) => {
    if (user?.id) {
      try {
        const { data } = await axios.patch(`${usersAPI}/${user.id}`, {
          password: newPassword,
        });
        setUser(data);
        return true;
      } catch (error) {
        console.log("error while changing password", error.message);
        return false;
      }
    }
  };

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
        infoUpdate,
        passwordChange,
        adminLogOut,
      }}
    >
      {!loading && children}
    </UserDataContext.Provider>
  );
}
