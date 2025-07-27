import { useEffect, useState } from "react";
import axios from "axios";

import { OrderContext } from "../ContextCreater&Hook";
import { useUser } from "../ContextCreater&Hook";
import { usersAPI } from "../../api";

export default function OrderProvider({ children }) {
  const { user } = useUser();
  const [orders, setOrder] = useState([]);

  //updating orderlist
  useEffect(() => {
    if (user) {
      axios
        .get(`${usersAPI}/${user.id}`)
        .then((res) => {
          setOrder(res.data.orders);
        })
        .catch((err) =>
          console.log("Erros occure while adding product to order list", err)
        );
    }
  }, [user]);

  //add to orders list
  const addtoOrders = (cart, totalAmount, address) => {
    console.log(orders);
    if (!user || !orders) return;
    const updatedOrder = [
      ...orders,
      {
        orderId: `ord-${Date.now()}`,
        status: "pending",
        items: cart,
        totalAmount: totalAmount,
        paymentMethod: "online",
        paymentStatus: "Paid",
        orderedAt: new Date().toLocaleString(),
        shippingAddress: address,
      },
    ];
    axios
      .patch(`${usersAPI}/${user.id}`, { orders: updatedOrder })
      .then((res) => setOrder(res.data.orders))
      .catch((err) =>
        console.log("error occure while adding products into order list", err)
      );
  };
  return (
    <OrderContext.Provider value={{ orders, addtoOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

// | Status       | Meaning                            |
// | ------------ | ---------------------------------- |
// | `pending`    | Order placed but not processed yet |
// | `processing` | Being prepared/packed              |
// | `shipped`    | Dispatched from warehouse          |
// | `delivered`  | Delivered to customer              |
// | `cancelled`  | Order was cancelled                |
// | `returned`   | Customer returned the order        |
