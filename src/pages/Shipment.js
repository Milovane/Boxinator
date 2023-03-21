import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ShipmentCube.css";
import { useContext } from "react";
import { Context } from "../context";
import keycloak from "../keycloak";

const weightOptions = ["BASIC", "HUMBLE", "DELUXE", "PREMIUM"];
const boxColors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "White",
  "Black",
  "Pink",
];

export default function Shipment() {
  const [receiverName, setReceiverName] = useState("");
  const [weightOption, setWeightOption] = useState("");
  const [boxColor, setBoxColor] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [price, setPrice] = useState(null);

  const boxRef = useRef(null);

const { context } = useContext(Context);
const currentUser = context.user;
const token = keycloak.token;
console.log(token);
const headers = {
  Authorization: `Bearer ${token}`,
};

console.log(keycloak.token)


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/countries", { headers: headers }
        );
        setDestinationCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      const faces = boxRef.current.querySelectorAll(".face");
      faces.forEach((face) => {
        face.style.backgroundColor = boxColor;
      });
    }
  }, [boxColor]);

  useEffect(() => {
    calculatePrice();
  }, [destinationCountry, weightOption]);

  const calculatePrice = () => {
    const weightMap = {
      BASIC: 1,
      HUMBLE: 2,
      DELUXE: 5,
      PREMIUM: 8,
    };

    const flatFee = 200;
    const selectedCountry = destinationCountries.find(
      (country) => country.id.toString() === destinationCountry
    );

    if (!selectedCountry || !weightOption) {
      setPrice(null);
      return;
    }

    const weight = weightMap[weightOption];
    const countryMultiplier = selectedCountry.countryMultiplier;

    // Check if the selected country is Norway, Sweden, or Denmark
    const nordicCountries = ["Norway", "Sweden", "Denmark"];
    if (nordicCountries.includes(selectedCountry.name)) {
      setPrice(flatFee);
      return;
    }

    const totalPrice = flatFee + weight * countryMultiplier;
    setPrice(totalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCountry = destinationCountries.find(
      (country) => country.id.toString() === destinationCountry
    );

    if (!selectedCountry) {
      console.error("No matching country found");
      return;
    }

    const shipmentData = {
      receiverName: receiverName,
      weightOption: weightOption,
      boxColor: boxColor,
      destinationCountry: selectedCountry.name,
      price: price,
      userId: keycloak.subject,
      
    };
    console.log(shipmentData)

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/shipments", shipmentData, { headers: headers }
      );

      console.log("Shipment created:", response.data);
      // Redirect to a success page or update the UI to show success message
    } catch (error) {
      console.error("Error creating shipment:", error);
      // Show error message or handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-lg mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:mx-4 dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8 md:grid md:grid-cols-3 md:gap-x-6"
      >
        <div className="md:col-span-2">
          <div>
            <label
              htmlFor="receiverName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Receiver Name
            </label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="weightOption"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Weight Option
            </label>
            <select
              id="weightOption"
              name="weightOption"
              value={weightOption}
              onChange={(e) => setWeightOption(e.target.value)}
              className="w-full"
              required
            >
              <option value="" disabled>
                Select weight option
              </option>
              {weightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="boxColor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Box Color
            </label>
            <select
              id="boxColor"
              name="boxColor"
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
              className="w-full"
              required
            >
              <option value="" disabled>
                Select color
              </option>
              {boxColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="destinationCountry"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Destination Country
            </label>
            <select
              id="destinationCountry"
              name="destinationCountry"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              className="w-full"
              required
            >
              <option value="" disabled>
                Select country
              </option>
              {destinationCountries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {price !== null && (
              <p className="text-gray-900 dark:text-white">
                Total cost: {price}Kr
              </p>
            )}
            <button
              type="submit"
              className="inline-flex justify-center items-center w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Shipment
            </button>
          </div>
        </div>
        <div className="relative w-full h-64 md:col-span-1">
          <div className="relative w-full h-64 md:col-span-1">
            <div
              ref={boxRef}
              className="cube absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="face top"></div>
              <div className="face bottom"></div>
              <div className="face left"></div>
              <div className="face right"></div>
              <div className="face front"></div>
              <div className="face back"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
