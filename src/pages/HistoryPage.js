import React, { useState } from "react";
import ShipmentTable from "../components/ShipmentTable";

export const HistoryPage = () => {
  const [orders, setOrders] = useState([]);

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return <ShipmentTable orders={orders} onDelete={handleDelete} />;
};
