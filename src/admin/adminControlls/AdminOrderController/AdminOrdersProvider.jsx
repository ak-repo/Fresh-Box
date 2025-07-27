import { useEffect, useState } from "react";
import { AdminOrdersContext } from "../AdminProviders&Hooks";
import { useUsersData } from "../AdminProviders&Hooks";

function AdminOrdersProvider({ children }) {
  const { usersList } = useUsersData();
  const [ordersList, setOrdersList] = useState([]);
  const [deliveredOrders, setDeliOrder] = useState(0);
  const [PendingOrders, setPendiOrder] = useState(0);
  const [cancelledOrders, setCancelOrder] = useState(0);

  useEffect(() => {
    //extracting all orders from users list
    if (usersList && Array.isArray(usersList)) {
      const allOrders = usersList.flatMap(
        (user) =>
          user?.orders.map((order) => ({
            ...order,
            userId: user.id,
            userName: user.name,
          })) || []
      );
      setOrdersList(allOrders);
    }
  }, [usersList]);

  // categorising orders
  useEffect(() => {
    if (Array.isArray(ordersList) && ordersList.length > 0) {
      setDeliOrder(ordersList.filter((order) => order?.status === "delivered"));
      setPendiOrder(ordersList.filter((order) => order?.status === "pending"));
      setCancelOrder(ordersList.filter((order) => order?.status === "cancelled"));
    }
  }, [ordersList]);

  return (
    <AdminOrdersContext.Provider value={{ ordersList,deliveredOrders, cancelledOrders, PendingOrders }}>
      {children}
    </AdminOrdersContext.Provider>
  );
}

export default AdminOrdersProvider;

// | Status       | Meaning                            |
// | ------------ | ---------------------------------- |
// | `pending`    | Order placed but not processed yet |
// | `processing` | Being prepared/packed              |
// | `shipped`    | Dispatched from warehouse          |
// | `delivered`  | Delivered to customer              |
// | `cancelled`  | Order was cancelled                |
// | `returned`   | Customer returned the order        |
