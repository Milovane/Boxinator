import React, { useEffect, useState } from "react";
import ShipmentCard from "../ShipmentComponents/ShipmentCard";
import axios from "axios";

const ShipmentPage = ({ keycloak }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchShipments();
    }
  }, [keycloak.authenticated]);

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchShipments();
    }
  }, []);


  const fetchShipments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${keycloak.subject}/shipments`, {
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

  const handleCreateShipmentClick = () => {
    window.location.href = "/create-shipment";
  };

  return (
    <div className="relative">
      <div className="mt-6">
        <h1 className="text-xl font-bold mb-4">Your Shipments</h1>
        <div>
          {shipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      </div>
      {keycloak.authenticated && (
        <button
          onClick={handleCreateShipmentClick}
          className="fixed bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Shipment
        </button>
      )}
    </div>
  );
};

export default ShipmentPage;