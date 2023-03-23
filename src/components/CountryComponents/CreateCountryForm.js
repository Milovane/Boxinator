import React, { useState } from "react";
import axios from "axios";
import CountryForm from "./CountryForm";
import keycloak from "../../keycloak";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import SnackBarComponent from "../UserFeedback/SnackBarComponent";
import { SnackbarMessageSeverity } from "../../const/SnackbarMessageSeverity";

const CreateCountryForm = () => {
  const [state, setState] = React.useState({
    open: false,
    snackbarMessage: "Empty",
    severity: "success",
  });
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);

  const [country, setCountry] = useState({
    name: "",
    countryMultiplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = keycloak.token;
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      // First, check if a country with the same name already exists
      const response = await axios.get(
        `http://localhost:8080/api/v1/countries/name/${country.name}`,
        {
          headers: headers,
        }
      );

      // If the country already exists, update the countryMultiplier value
      if (response.data && response.data.id) {
        const updateResponse = await axios.put(
          `http://localhost:8080/api/v1/countries/${response.data.id}`,
          { ...country, id: response.data.id },
          { headers: headers }
        );

        console.log(updateResponse.data);
        updateContext(updateResponse.data);
        navigate("/country"); // Update this to the desired path after updating a country
        openSnackBar("Country updated", SnackbarMessageSeverity.Info);
      }
    } catch (error) {
      console.log(error);

      // If the country doesn't exist, create a new one
      try {
        const createResponse = await axios.post(
          "http://localhost:8080/api/v1/countries",
          country,
          {
            headers: headers,
          }
        );

        console.log(createResponse.data);
        updateContext(createResponse.data);
        navigate("/country"); // Update this to the desired path after creating a country
        openSnackBar("Country created", SnackbarMessageSeverity.Success);
      } catch (error) {
        console.log(error);
        openSnackBar(
          "Error updating/creating country",
          SnackbarMessageSeverity.Error
        );
      }
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
      <CountryForm
        handleSubmit={handleSubmit}
        buttonName={"Create Country"}
        country={country}
        handleChange={handleChange}
        updateCountry={false}
      />
      <SnackBarComponent
        snackbarDetails={state}
        closeSnack={() => closeSnackbar}
      />
    </>
  );
};

export default CreateCountryForm;
