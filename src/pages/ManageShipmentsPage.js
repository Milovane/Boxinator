import React, { useEffect, useState } from "react";
import AdminShipmentCard from "../components/ShipmentComponents/AdminShipmentCard";
import axios from "axios";

const ManageShipmentsPage = ({ keycloak }) => {
  const [shipments, setShipments] = useState([]);

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/shipments", {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      setShipments(response.data);
      console.log("Fetched shipments:", response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    if (keycloak.authenticated && keycloak.token) {
      fetchShipments();
    }
  }, [keycloak.token]);

  const handleStatusUpdate = (shipmentId, newShipmentStatusHistory) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              shipmentHistory: [
                ...shipment.shipmentHistory,
                newShipmentStatusHistory,
              ],
            }
          : shipment
      )
    );
  };

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold mb-4">Manage Shipments</h1>
      <div className="flex flex-wrap">
        {shipments.map((shipment) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4" key={shipment.id}>
            <AdminShipmentCard shipment={shipment} keycloak={keycloak} onStatusUpdate={handleStatusUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageShipmentsPage;