import React, { useState } from "react";
import axios from "axios";

const AdminShipmentCard = ({ shipment, keycloak, onStatusUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [shipmentHistory, setShipmentHistory] = useState(
    shipment.shipmentHistory
  );
  const { receiverName, weightOption, boxColor, destinationCountry, price } =
    shipment;

  const latestStatus = shipmentHistory.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const statusMap = {
    CREATED: 0,
    RECEIVED: 1,
    INTRANSIT: 2,
    COMPLETED: 3,
    CANCELLED: 4,
  };

  const renderStatusMap = () => {
    const map = [];
    const cancelled = latestStatus.shipmentStatus === "CANCELLED";
    const completed = latestStatus.shipmentStatus === "COMPLETED";
    for (let i = 0; i < 4; i++) {
      map.push(
        <span
          key={i}
          className={`${
            cancelled
              ? "bg-red-500"
              : completed
              ? "bg-yellow-300"
              : i <= statusMap[latestStatus.shipmentStatus]
              ? "bg-green-500"
              : "bg-gray-300"
          } w-4 h-4 rounded-full`}
        ></span>
      );
      if (i < 3) {
        map.push(
          <span
            key={`line-${i}`}
            className={`${
              cancelled
                ? "bg-red-500"
                : completed
                ? "bg-yellow-300"
                : "bg-gray-300"
            } mx-1 w-4 h-1 block`}
          ></span>
        );
      }
    }
    return map;
  };

  const fetchShipmentDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/shipments/${shipment.id}`,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );
      const updatedShipment = response.data;
      setShipmentHistory(updatedShipment.shipmentHistory);
    } catch (error) {
      console.error("Error fetching shipment details:", error);
    }
  };

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;

    try {
      await axios.post(
        `http://localhost:8080/api/v1/shipments/${shipment.id}/status/${selectedStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Refetch shipment details
      fetchShipmentDetails();
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error("Error updating shipment status:", error);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderShipmentStatusHistory = () => {
    return shipmentHistory
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort by createdAt in ascending order
      .map((statusHistory, index) => (
        <li key={index}>
          {statusHistory.shipmentStatus} -{" "}
          {new Date(statusHistory.createdAt).toLocaleDateString()}{" "}
          {new Date(statusHistory.createdAt).toLocaleTimeString()}
        </li>
      ));
  };

  return (
    <div
      className="bg-white shadow-md rounded p-6 mb-4 cursor-pointer mt-20"
      onClick={toggleDetails}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-bold mb-2">{receiverName}</div>
          <div className="text-sm mb-2">Weight Option: {weightOption}</div>
          <div className="text-sm mb-2">Box Color: {boxColor}</div>
          <div className="text-sm mb-2">
            Destination Country: {destinationCountry}
          </div>
          <div className="text-sm mb-4">Price: ${price}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-base font-semibold mb-2">
            Status:{" "}
            {shipmentHistory.length > 0
              ? latestStatus.shipmentStatus
              : "Not available"}
          </div>
          <div className="flex">{renderStatusMap()}</div>
        </div>
      </div>
      {showDetails && (
        <div className="bg-gray-100 p-4 mt-4 rounded">
          <div className="font-bold mb-2">Shipment History:</div>
          <ul className="list-disc pl-4">{renderShipmentStatusHistory()}</ul>
          <div className="mt-4">
            <label htmlFor={`status-${shipment.id}`} className="font-bold mr-2">
              Update Status:
            </label>
            <select
              id={`status-${shipment.id}`}
              value={latestStatus.shipmentStatus}
              onChange={handleStatusChange}
            >
              {Object.keys(statusMap).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShipmentCard;
