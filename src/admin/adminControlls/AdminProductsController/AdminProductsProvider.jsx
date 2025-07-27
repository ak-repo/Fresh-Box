import axios from "axios";

import { AdminProductsContext } from "../AdminProviders&Hooks";
import { useEffect, useState } from "react";
import { productsAPI } from "../../../api";

function AdminProductsProvider({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [totalProductCount, setProductCount] = useState(0);

  //fetching all products
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(productsAPI);
      setProductsList(data);
    })();
  }, []);

  //updating products count
  useEffect(() => {
    if (productsList && Array.isArray(productsList)) {
      setProductCount(productsList.length);
    }
  }, [productsList]);

  return (
    <AdminProductsContext.Provider value={{ productsList, totalProductCount }}>
      {children}
    </AdminProductsContext.Provider>
  );
}

export default AdminProductsProvider;
