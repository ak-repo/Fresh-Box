import { useState, useEffect } from "react";

import { AdminRevenueContext } from "../AdminProviders&Hooks";
import { useOrdersData } from "../AdminProviders&Hooks";
function AdminRevenueProvider({ children }) {
  const [totalRevenue, setRevenue] = useState(0);
  const [totalCost, setCost] = useState(0);
  const { ordersList } = useOrdersData();

  //total revenue
  useEffect(() => {
    const revenue = ordersList.reduce((accu, order) => {
      accu += order?.totalAmount?.totalCost;
      return accu;
    }, 0);
    const cost = ordersList.reduce((accu, order) => {
      accu += (Number(order?.items?.length) || 1) * 40;
      return accu;
    }, 0);

    if (revenue && cost) {
      setRevenue(revenue);

      setCost(cost);
    }
  }, [ordersList]);

  return (
    <AdminRevenueContext.Provider value={{ totalCost, totalRevenue }}>
      {children}
    </AdminRevenueContext.Provider>
  );
}

export default AdminRevenueProvider;
