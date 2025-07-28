import axios from "axios";

import { AdminProductsContext } from "../AdminProviders&Hooks";
import { useEffect, useState } from "react";
import { productsAPI } from "../../../api";

function AdminProductsProvider({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [totalProductCount, setProductCount] = useState(0);
  const [reupdate, setReupdate] = useState(false);

  //fetching all products
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(productsAPI);
      setProductsList(data);
    })();
  }, [reupdate]);

  //updating products count
  useEffect(() => {
    if (productsList && Array.isArray(productsList)) {
      setProductCount(productsList.length);
    }
  }, [productsList]);
  // updateProductStock, deleteProduct

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
        productsList,
        totalProductCount,
        updateProductStock,
        deleteProduct,
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
}

export default AdminProductsProvider;
