import React, { useState } from "react";

const ShipmentCard = ({ shipment }) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    receiverName,
    weightOption,
    boxColor,
    destinationCountry,
    price,
    shipmentHistory,
  } = shipment;

  const latestStatus = shipmentHistory[shipmentHistory.length - 1];

  const statusMap = {
    CREATED: 0,
    RECEIVED: 1,
    INTRANSIT: 2,
    COMPLETED: 3,
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
              cancelled ? "bg-red-500" : completed ? "bg-yellow-300" : "bg-gray-300"
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
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
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
          <div className="text-sm mb-2">Destination Country: {destinationCountry}</div>
          <div className="text-sm mb-4">Price: ${price}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-base font-semibold mb-2">Status: {latestStatus.shipmentStatus}</div>
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
                  {historyItem.shipmentStatus} - {formatDate(historyItem.createdAt)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShipmentCard;