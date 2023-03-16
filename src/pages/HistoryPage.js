import React, { useState } from "react";
import ShipmentTable from "../components/ShipmentTable";

export const HistoryPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Smith",
      address: "123 Main St",
      category: "medium",
      status: "recieved",
    },
    {
      id: 2,
      customerName: "Jane Doe",
      address: "456 Elm St",
      category: "medium",
      status: "recieved",
    },

    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      address: "789 Maple St",
      category: "medium",
      status: "Pending",
    },
  ]);

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return <ShipmentTable orders={orders} onDelete={handleDelete} />;
};
