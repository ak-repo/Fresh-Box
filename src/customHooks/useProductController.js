import axios from "axios";

import { productsAPI } from "../api";

export function useProductController() {
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(productsAPI);
      return data;
    } catch (error) {
      console.error("Error retrieving all products:", error.message);
      return [];
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    try {
      const { data } = await axios.get(`${productsAPI}/${id}`);
      return data;
    } catch (error) {
      console.error("Error retrieving product by ID:", error.message);
      return null;
    }
  };

  return { getAllProducts, getProductById };
}
