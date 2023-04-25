import React, { useEffect, useState } from "react";
import ShipmentCard from "../components/ShipmentComponents/ShipmentCard";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";
import { user } from "../keycloak";

const ShipmentPage = ({ keycloak }) => {
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);
  const [shipments, setShipments] = useState([]);
  const fontSizeMUIIcons = "10px";

  const filterShipments = (status) => {
    return shipments
      .filter((shipment) => {
        const latestStatus = shipment.shipmentHistory[0].shipmentStatus;
        return status.includes(latestStatus);
      })
      .sort((a, b) => {
        const aStatus = a.shipmentHistory[0].shipmentStatus;
        const bStatus = b.shipmentHistory[0].shipmentStatus;
        const aDate = new Date(a.shipmentHistory[0].createdAt);
        const bDate = new Date(b.shipmentHistory[0].createdAt);

        if (aStatus === bStatus) {
          return bDate - aDate;
        }

        return aStatus.localeCompare(bStatus);
      });
  };
  const handleCreateShipmentClick = () => {
    navigate("/create-shipment");
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
      const sortedShipments = response.data.map((shipment) => ({
        ...shipment,
        shipmentHistory: shipment.shipmentHistory.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      }));

      setShipments(sortedShipments);
      console.log("Fetched shipments:", sortedShipments);
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

  return (
    <div className="w-full md:w-auto">
      <div className="mt-5 md:mt-32">
        <div className="bg-white rounded p-4 mb-8">
          <h1 className="text-2xl font-bold mb-2">Your Shipments</h1>
          <p className="text-black-600">
            Here you can view all your shipments. Clicking a shipment shows you
            the status updates.
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          <div className="mb-10">
            <h2 className="text-[20px] font-semibold mb-4 bg-white px-4 py-2 rounded-md md:rounded-l-md md:rounded-r-none">
              <span className="text-green-700">
                <LocalShippingIcon fontSize={fontSizeMUIIcons} />
              </span>
              Active Shipments
            </h2>
            {filterShipments(["CREATED", "RECEIVED", "INTRANSIT"]).map(
              (shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              )
            )}
          </div>
          <div className="mb-10">
            <h2 className="text-[20px] font-semibold mb-4 bg-white px-4 py-2 rounded-md md:rounded-none">
              <span className="text-yellow-400">
                <CheckCircleIcon fontSize={fontSizeMUIIcons} />
              </span>
              Completed Shipments
            </h2>
            {filterShipments(["COMPLETED"]).map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
          <div className="mb-20">
            <h2 className="text-[20px] font-semibold mb-4 bg-white px-4 py-2 rounded-md md:rounded-r-md md:rounded-l-none">
              <span className="text-red-700">
                <CancelIcon fontSize={fontSizeMUIIcons} />
              </span>
              Cancelled Shipments
            </h2>
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
