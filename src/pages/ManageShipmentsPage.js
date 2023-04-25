import React, { useContext, useEffect, useState } from "react";
import AdminShipmentCard from "../components/ShipmentComponents/AdminShipmentCard";
import axios from "axios";
import { user } from "../keycloak";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const ManageShipmentsPage = ({ keycloak }) => {
  const { context, updateContext } = useContext(Context);
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();

  const fetchShipments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/shipments",
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
    if (user == null) {
      navigate("/register");
    } else {
      updateContext(user);
    }
  }, []);

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
      <div className="bg-white rounded p-4 mb-8">
        <h1 className="text-2xl font-bold mb-2">Manage Shipments</h1>
        <p className="text-black-600">
          Here you can view and manage all the shipments in the system. Clicking
          a shipment shows you the status updates with the functionality of
          changing a shipments status. They
        </p>
      </div>
      <div className="flex flex-wrap">
        {shipments.map((shipment) => (
          <div
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
            key={shipment.id}
          >
            <AdminShipmentCard
              shipment={shipment}
              keycloak={keycloak}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageShipmentsPage;
