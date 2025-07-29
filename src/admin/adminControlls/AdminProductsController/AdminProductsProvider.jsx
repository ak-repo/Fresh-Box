import axios from "axios";

import { AdminProductsContext } from "../AdminProviders&Hooks";
import { useEffect, useState } from "react";
import { productsAPI } from "../../../api";

function AdminProductsProvider({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [displayList, setdisplaylist] = useState([]);
  const [totalProductCount, setProductCount] = useState(0);
  const [reupdate, setReupdate] = useState(false);
  const [search, setSearch] = useState("");
  const [filtervalue, setFilter] = useState("All");
  const [identifier, setIdentifier] = useState(null);

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
    console.log(typeof filtervalue);
    console.log(identifier);
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
  }, [ filtervalue]);

  //update product
  const productPatchwork = (productId, change) => {
    if (productId) {
      axios
        .patch(`${productsAPI}/${productId}`, change)
        .then(() => setReupdate(!reupdate))
        .catch((error) =>
          console.log(
            "error found while updating product quantity",
            error.message
          )
        );
    }
  };

  // stock update
  const updateProductStock = (productId, currentStrock) => {
    productPatchwork(productId, { quantity: currentStrock });
  };

  // delete product
  const deleteProduct = async (productId) => {
    if (productId) {
      await axios
        .delete(`${productsAPI}/${productId}`)
        .then(() => setReupdate(!reupdate))
        .catch((error) =>
          console.log("error while deleting product", error.message)
        );
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
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
}

export default AdminProductsProvider;
