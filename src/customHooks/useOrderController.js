import { useContext, useEffect, useState } from "react";
// import { useCartController } from "./useCartController";
import { UserDataContext } from "../ContextAPI/AuthContext";
import axios from "axios";

const BASE_API = "http://localhost:3000/users";

export function useOrderController() {
  const { user } = useContext(UserDataContext);
  //   const { cart } = useCartController();
  const [orders, setOrder] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(`${BASE_API}/${user.id}`)
        .then((res) => {
          setOrder(res.data.orders);
        })
        .catch((err) =>
          console.log("Erros occure while adding product to order list", err)
        );
    }
  }, []);

  //add to orders list
  const addtoOrders = (cart, totalAmount, address) => {
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
        date: new Date().toLocaleString(),
        shippingAddress: address,
      },
    ];
    axios
      .patch(`${BASE_API}/${user.id}`, { orders: updatedOrder })
      .then((res) => console.log(res))
      .catch((err) =>
        console.log("error occure while adding products into order list", err)
      );
  };
  return { orders, addtoOrders };
}

// | Status       | Meaning                            |
// | ------------ | ---------------------------------- |
// | `pending`    | Order placed but not processed yet |
// | `processing` | Being prepared/packed              |
// | `shipped`    | Dispatched from warehouse          |
// | `delivered`  | Delivered to customer              |
// | `cancelled`  | Order was cancelled                |
// | `returned`   | Customer returned the order        |


