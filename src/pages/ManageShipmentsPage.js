import React, { useEffect, useState } from "react";
import AdminShipmentCard from "../ShipmentComponents/AdminShipmentCard";
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

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold mb-4">Manage Shipments</h1>
      <div className="flex flex-wrap">
        {shipments.map((shipment) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4" key={shipment.id}>
            <AdminShipmentCard shipment={shipment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageShipmentsPage;