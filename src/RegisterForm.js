import React, { useState } from "react";
import axios from "axios";
import UserForm from "./components/UserComponents/UserForm";
import keycloak from "./keycloak";
import { useContext } from "react";
import { Context } from "./context";

const RegisterForm = () => {
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

  console.log(keycloak.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUser = { ...user, typeOfUser: "Registered" };
    console.log(registeredUser);

    if (registeredUser.country.trim() === "") {
      alert("Country is required");
      return;
    }

    const token = keycloak.token;
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        "http://localhost:8080/api/v1/users/registerRegularUser",
        registeredUser,
        { headers: headers }
      )
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
      buttonName={"Register"}
      user={user}
      handleChange={handleChange}
    ></UserForm>
  );
};

export default RegisterForm;
