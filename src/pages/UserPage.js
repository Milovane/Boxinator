import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import countriesList from "../countries.json";
import UserForm from "../components/UserComponents/UserForm";
import keycloak from "../keycloak";

const UserPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    zipCode: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = keycloak.token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    axios
      .put(`http://localhost:8080/api/v1/users/${user.Id}`, user, { headers: headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserForm
      handleSubmit={handleSubmit}
      buttonName={"Update information"}
      user={user}
      handleChange={handleChange}
    ></UserForm>
  );
};

export default UserPage;