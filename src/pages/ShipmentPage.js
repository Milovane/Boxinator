import React, { useEffect, useState } from "react";
import ShipmentCard from "../components/ShipmentComponents/ShipmentCard";
import axios from "axios";

const ShipmentPage = ({ keycloak }) => {
  const [shipments, setShipments] = useState([]);

  const filterShipments = (status) => {
    return shipments.filter((shipment) => {
      const latestStatus =
        shipment.shipmentHistory[shipment.shipmentHistory.length - 1]
          .shipmentStatus;
      return status.includes(latestStatus);
    });
  };

  const handleCreateShipmentClick = () => {
    window.location.href = "/create-shipment";
  };

  const fetchShipments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${keycloak.subject}/shipments`,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );
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
    <div className="relative">
    <div className="mt-6">
    <div className="bg-white rounded p-4 mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Shipments</h1>
        <p className="text-black-600">
          Here you can view all your shipments. Clicking a shipment shows you the status updates.
        </p>
      </div>
      <div className="flex justify-around">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-white bg-green-600 px-4 py-2 rounded-md">Active Shipments</h2>
          {filterShipments(["CREATED", "RECEIVED", "INTRANSIT"]).map(
            (shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            )
          )}
        </div>
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-white bg-yellow-400 px-4 py-2 rounded-md">Completed Shipments</h2>
          {filterShipments(["COMPLETED"]).map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-white bg-red-600 px-4 py-2 rounded-md">Cancelled Shipments</h2>
          {filterShipments(["CANCELLED"]).map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
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
