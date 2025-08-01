import { useEffect, useState } from "react";
import { AdminOrdersContext } from "../AdminProviders&Hooks";
import { useUsersData } from "../AdminProviders&Hooks";
import { usersAPI } from "../../../api";
import { useToast } from "../../../ContextAPI/ContextCreater&Hook";

import axios from "axios";

function AdminOrdersProvider({ children }) {
  const { usersList, reupdate, setReupdate } = useUsersData();
  const [ordersList, setOrdersList] = useState([]);
  const [deliveredOrders, setDeliOrder] = useState(0);
  const [pendingOrders, setPendiOrder] = useState(0);
  const [cancelledOrders, setCancelOrder] = useState(0);
  const { toastFail, toastSuccess } = useToast();

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
      setOrdersList(allOrders.reverse());
    }
  }, [usersList]);

  // categorising orders
  useEffect(() => {
    if (Array.isArray(ordersList) && ordersList.length > 0) {
      setDeliOrder(ordersList.filter((order) => order?.status === "delivered"));
      setPendiOrder(ordersList.filter((order) => order?.status === "pending"));
      setCancelOrder(
        ordersList.filter((order) => order?.status === "cancelled")
      );
    }
  }, [ordersList]);

  //  updateOrderStatus,
  const updateOrderStatus = async (currentOrder) => {
    console.log(currentOrder);
    if (currentOrder?.userId && currentOrder?.orderId) {
      try {
        const { data } = await axios.get(`${usersAPI}/${currentOrder?.userId}`);

        //replacing order using orderId
        const updatedOrder = data?.orders.map((order) =>
          order.orderId === currentOrder.orderId ? currentOrder : order
        );

        await axios.patch(`${usersAPI}/${currentOrder?.userId}`, {
          orders: updatedOrder,
        });
        toastSuccess(`Order status updated to ${currentOrder?.status}.`);

        setReupdate(!reupdate);
      } catch (error) {
        toastFail("Unable to update order status. Please retry.");

        console.log("error while updating order status", error.message);
      }
    }
  };

  return (
    <AdminOrdersContext.Provider
      value={{
        ordersList,
        deliveredOrders,
        cancelledOrders,
        pendingOrders,
        updateOrderStatus,
      }}
    >
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
