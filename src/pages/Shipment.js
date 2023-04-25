import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/ShipmentCube.css";
import { useContext } from "react";
import { Context } from "../context";
import keycloak, { user } from "../keycloak";
import { sendEmailAPI } from "../Email";
import { SnackbarMessageSeverity } from "../const/SnackbarMessageSeverity";
import SnackBarComponent from "../components/UserFeedback/SnackBarComponent";
import Receipt from "../components/ShipmentComponents/Receipt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import "../styles/shipment.css";
import InfoIcon from "@mui/icons-material/Info";

const weightOptions = ["BASIC", "HUMBLE", "DELUXE", "PREMIUM"];
const boxColors = [
  "Red",
  "Orange",
  "Brown",

  "Yellow",
  "Gold",
  "Lime",
  "Green",
  "Turquoise",
  "Blue",
  "Navy",
  "Purple",
  "Pink",
  "White",
  "Grey",
  "Black",
];

export default function Shipment() {
  const { context, updateContext } = useContext(Context);
  const [receiverName, setReceiverName] = useState("");
  const [email, setEmail] = useState("");
  const [weightOption, setWeightOption] = useState("");
  const [boxColor, setBoxColor] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [price, setPrice] = useState(null);

  const [state, setState] = React.useState({
    open: false,
    snackbarMessage: "Empty",
    severity: "success",
  });

  const boxRef = useRef(null);
  const currentUser = context.user;
  const token = keycloak.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (user != null) {
      updateContext(user);
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/countries/list"
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
      (country) => country.id === destinationCountry
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
      (country) => country.id === destinationCountry
    );

    if (!selectedCountry) {
      console.error("No matching country found");
      return;
    }

    let shipmentData = {};
    let endpoint = "";
    if (keycloak.authenticated) {
      shipmentData = {
        receiverName: receiverName,
        weightOption: weightOption,
        boxColor: boxColor,
        destinationCountry: selectedCountry.name,
        price: price,
        userId: keycloak.subject,
      };
      endpoint = "http://localhost:8080/api/v1/shipments";
    } else {
      shipmentData = {
        receiverName: receiverName,
        weightOption: weightOption,
        boxColor: boxColor,
        destinationCountry: selectedCountry.name,
        guestUserDto: {
          email: email,
          typeOfUser: "Guest",
        },
        price: price,
      };
      endpoint = `http://localhost:8080/api/v1/shipments/createGuestShipment/${email}`;
    }

    try {
      let response;
      if (keycloak.authenticated) {
        response = await axios.post(endpoint, shipmentData, {
          headers: headers,
        });
      } else {
        console.log("Posting guest shipment");
        console.log(shipmentData);
        response = await axios
          .post(endpoint, shipmentData)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      }

      openSnackBar("Shipment created", SnackbarMessageSeverity.Success);
      //console.log("Shipment created:", response.data);
      console.log();
      if (email.trim() !== "") {
        // Call sendEmailAPI function
        if (!keycloak.authenticated) {
          //Only guest users will get an email
          sendEmailAPI(shipmentData);
        }
      }
      // Redirect to a success page or update the UI to show success message
    } catch (error) {
      openSnackBar("Error creating shipment", SnackbarMessageSeverity.Error);
      console.error("Error creating shipment:", error);
      // Show error message or handle error
    }
  };

  function openSnackBar(message, messageSeverity) {
    const newState = {
      open: true,
      snackbarMessage: message,
      severity: messageSeverity,
    };

    setState({ ...newState });
  }

  const closeSnackbar = () => {
    const newState = {
      open: false,
      snackbarMessage: "",
      severity: "success",
    };
    setState({ ...newState });
  };

  return (
    <>
      <div className="shipmentContainer container md:mx-auto mt-32 mb-5 rounded-lg">
        <div className="optionsDiv">
          <TextField
            required
            id="receiverName"
            label="Receiver name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            fullWidth
          />
          <TextField
            id="weightOption"
            select
            label="Weight option"
            onChange={(e) => setWeightOption(e.target.value)}
            value={weightOption}
            fullWidth
          >
            {weightOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="boxColors"
            select
            label="Box color"
            onChange={(e) => setBoxColor(e.target.value)}
            value={boxColor}
            fullWidth
          >
            {boxColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="destinationCountry"
            select
            label="Destination country"
            onChange={(e) => setDestinationCountry(e.target.value)}
            value={destinationCountry}
            fullWidth
          >
            {destinationCountries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
          {!keycloak.authenticated && (
            <TextField
              required
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          )}
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Create Shipment
          </Button>
        </div>
        <div className="receiptContainer">
          <div>
            <Receipt
              weightOption={weightOption}
              boxColor={boxColor}
              destinationCountry={destinationCountry}
              destinationCountries={destinationCountries}
              price={price}
            />
          </div>
          <div className="cubeContainer">
            <div ref={boxRef} className="cube">
              <div className="face top"></div>
              <div className="face bottom"></div>
              <div className="face left"></div>
              <div className="face right"></div>
              <div className="face front"></div>
              <div className="face back"></div>
            </div>
          </div>
        </div>

        <SnackBarComponent
          snackbarDetails={state}
          closeSnack={() => closeSnackbar}
        />
      </div>
      {!keycloak.authenticated && (
        <div className="shipmentContainer container md:mx-auto mt-[10px] mb-24 bg-white p-5 rounded-lg">
          <p>
            <span className="text-blue-600">
              <InfoIcon />
            </span>
            You are not logged in and will add a shipment as a guest user
          </p>
        </div>
      )}
      {keycloak.authenticated && user == null && (
        <div className="shipmentContainer container md:mx-auto mt-[10px] mb-24 bg-white p-5 rounded-lg">
          <p>
            <span className="text-blue-600">
              <InfoIcon />
            </span>
            You do not have an account at boxinator
          </p>
        </div>
      )}
    </>
  );
}
