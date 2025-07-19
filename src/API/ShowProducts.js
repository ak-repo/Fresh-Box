// import { useContext } from "react";

import axios from "axios";

// import { ProductContext } from "./ProductContext";

export const productsAPI = "http://localhost:3000/products";

export const GetAllProducts = async () => {
  try {
    const { data } = await axios.get(productsAPI);
    return data;
  } catch (error) {
    console.log("Error found when retriving all products", error.message);
    return [];
  } finally {
    // console.log("Fetching products is done");
  }
};

export const GetProductById = async (id) => {
  try {
    const { data } = await axios.get(`${productsAPI}?id=${id}`);
    return data;
  } catch (error) {
    console.log("Error found while geting the product by id", error.message);
    return [];
  }
};
