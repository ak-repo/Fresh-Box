import axios from "axios";

import { usersAPI } from "../../api";

export const registerNewUser = async (newUser) => {
  try {
    await axios.post(usersAPI, newUser);
    return true;
  } catch (err) {
    console.error("Registration error:", err.message);
    return false;
  } finally {
    console.log("Registration process completed");
  }
};
