import React, { useState, useEffect } from "react";
import axios from "axios";

const ShipmentCard = ({ shipment, keycloak }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [shipmentHistory, setShipmentHistory] = useState(
    shipment.shipmentHistory
  );

  const { receiverName, weightOption, boxColour, destinationCountry, price } =
    shipment;

  const latestStatus = shipmentHistory.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const statusMap = {
    CREATED: 0,
    RECEIVED: 1,
    INTRANSIT: 2,
    COMPLETED: 3,
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

  const renderStatusMap = () => {
    const map = [];
    const cancelled = latestStatus.shipmentStatus === "CANCELLED";
    const completed = latestStatus.shipmentStatus === "COMPLETED";
    console.log(latestStatus);
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    fetchShipmentDetails();
  }, []);

  return (
    <div
      className="bg-white shadow-md rounded p-6 mb-4 cursor-pointer mt-5"
      onClick={toggleDetails}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-bold mb-2">{receiverName}</div>
          <div className="text-sm mb-2">Weight Option: {weightOption}</div>
          <div className="text-sm mb-2">Box Color: {boxColour}</div>
          <div className="text-sm mb-2">
            Destination Country: {destinationCountry}
          </div>
          <div className="text-sm mb-4">Price: ${price}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-base font-semibold mb-2">
            Status: {latestStatus.shipmentStatus}
          </div>
          <div className="flex">{renderStatusMap()}</div>
        </div>
      </div>
      {showDetails && (
        <div className="bg-gray-100 p-4 mt-4 rounded">
          <div className="font-bold mb-2">Shipment History:</div>
          <ul className="list-disc pl-4">
            {shipmentHistory
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((historyItem) => (
                <li key={historyItem.Id}>
                  {historyItem.shipmentStatus} -{" "}
                  {formatDate(historyItem.createdAt)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShipmentCard;
