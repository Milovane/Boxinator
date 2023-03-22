import React, { useState } from "react";
import axios from "axios";
import CountryForm from "./CountryForm";
import keycloak from "../../keycloak";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";

const CreateCountryForm = () => {
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);

  const [country, setCountry] = useState({
    name: "",
    countryMultiplier: "",
  });

  console.log(keycloak.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = keycloak.token;
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8080/api/v1/countries/list", country)
      .then((response) => {
        console.log(response.data);
        if (response.request.status === 200) {
          updateContext(response.data);
          navigate("/country"); // Update this to the desired path after creating a country
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CountryForm
      handleSubmit={handleSubmit}
      buttonName={"Create Country"}
      country={country}
      handleChange={handleChange}
    ></CountryForm>
  );
};

export default CreateCountryForm;
