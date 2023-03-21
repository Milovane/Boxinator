import React, { useState, useEffect } from "react";
import ShipmentCard from "./ShipmentCard";

const UserShipments = ({ userId, keycloakToken }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchUserShipments();
  }, [userId]);

  async function fetchUserShipments() {
    try {
      const apiResponse = await fetch(`http://localhost:8080/api/v1/shipments/user/${userId}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + keycloakToken,
          "User-Agent": "any-name",
        },
      });

      const fetchedShipments = await apiResponse.json();
      setShipments(fetchedShipments);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shipments.map((shipment) => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  );
};

export default UserShipments;