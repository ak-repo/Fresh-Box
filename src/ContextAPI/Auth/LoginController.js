import { usersAPI } from "../../api";
import axios from "axios";


export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.get(
      `${usersAPI}?email=${email}&password=${password}`
    );
    const user = data[0];
    if (!user) throw new Error("Invalid credentials");
    return user;
  } catch (err) {
    console.error("Login error:", err.message);
    throw err;
  }
};
