import axios from "axios";

import { AdminProductsContext } from "../AdminProviders&Hooks";
import { useEffect, useState } from "react";
import { productsAPI } from "../../../api";
import { useToast } from "../../../ContextAPI/ContextCreater&Hook";

function AdminProductsProvider({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [displayList, setdisplaylist] = useState([]);
  const [totalProductCount, setProductCount] = useState(0);
  const [reupdate, setReupdate] = useState(false);
  const [search, setSearch] = useState("");
  const [filtervalue, setFilter] = useState("All");
  const [identifier, setIdentifier] = useState(null);
  const { toastFail, toastSuccess } = useToast();

  //fetching all products
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(productsAPI);
        setProductsList(data);
        setdisplaylist(data);
      } catch (error) {
        console.log("Error while fetching product data", error.message);
      }
    })();
  }, [reupdate]);

  //updating products count
  useEffect(() => {
    if (productsList && Array.isArray(productsList)) {
      setProductCount(productsList.length);
    }
  }, [productsList]);

  //search
  useEffect(() => {
    setdisplaylist(
      productsList.filter((product) =>
        product?.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  // filterinng
  useEffect(() => {
    if (filtervalue === "All") {
      setdisplaylist(productsList);
      return;
    }
    if (filtervalue === 1) {
      setdisplaylist(
        productsList.filter((product) => product[identifier] >= filtervalue)
      );
      return;
    }
    setdisplaylist(
      productsList.filter((product) => product[identifier] === filtervalue)
    );
  }, [filtervalue]);

  //update product
  const productPatchwork = (productId, change) => {
    if (productId) {
      try {
        axios.patch(`${productsAPI}/${productId}`, change);
        setReupdate(!reupdate);
        toastSuccess("Product updated successfully.");
      } catch (error) {
        console.log("error while updating product info, ", error.message);
      }
    }
  };

  // stock update
  const updateProductStock = (productId, currentStrock) => {
    productPatchwork(productId, { quantity: currentStrock });
  };

  // delete product
  const deleteProduct = async (productId) => {
    if (productId) {
      try {
        await axios.delete(`${productsAPI}/${productId}`);
        setReupdate(!reupdate);
        toastSuccess("Product deleted permanently.");
      } catch (error) {
        console.log("error while deleting product", error.message);
      }
    }
  };

  // add new product
  const createNewProduct = async (product) => {
    try {
      await axios.post(productsAPI, product);
      setReupdate(!reupdate);
      toastSuccess("Product added successfully!");
    } catch (error) {
      console.log("error while adding new product", error.message);
      toastFail("Failed to add product. Please try again.");
    }
  };

  return (
    <AdminProductsContext.Provider
      value={{
        totalProductCount,
        updateProductStock,
        deleteProduct,
        search,
        setSearch,
        displayList,
        productsList,
        filtervalue,
        setFilter,
        identifier,
        setIdentifier,
        createNewProduct,
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
}

export default AdminProductsProvider;
