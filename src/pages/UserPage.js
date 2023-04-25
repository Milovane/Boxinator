import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import countriesList from "../countries.json";
import UserForm from "../components/UserComponents/UserForm";
import keycloak, { updateUser } from "../keycloak";
import { user as keycloakUser } from "../keycloak";
import { useContext } from "react";
import { Context } from "../context";
import SnackBarComponent from "../components/UserFeedback/SnackBarComponent";
import { SnackbarMessageSeverity } from "../const/SnackbarMessageSeverity";

const UserPage = () => {
  const [state, setState] = React.useState({
    open: false,
    snackbarMessage: "Empty",
    severity: "success",
  });
  const { context, updateContext } = useContext(Context);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    zipCode: "",
    contactNumber: "",
  });

  useEffect(() => {
    console.log("Component has loaded");
    const userFieldsFromContext = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      country: "",
      zipCode: "",
      contactNumber: "",
    };

    if (keycloakUser != null) {
      userFieldsFromContext.firstName = keycloakUser.firstName;
      userFieldsFromContext.lastName = keycloakUser.lastName;
      userFieldsFromContext.email = keycloakUser.email;
      userFieldsFromContext.dateOfBirth = keycloakUser.dateOfBirth;
      userFieldsFromContext.country = keycloakUser.country;
      userFieldsFromContext.zipCode = keycloakUser.zipCode;
      userFieldsFromContext.contactNumber = keycloakUser.contactNumber;
    }

    setUser(userFieldsFromContext);
  }, [keycloak.token, keycloakUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(keycloakUser);
    console.log(keycloak.subject);
    console.log(user);
    console.log(context);

    e.preventDefault();

    const token = keycloak.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const postUser = {
      id: keycloak.subject,
      ...user,
    };

    axios
      .put(`http://localhost:8080/api/v1/users/${keycloak.subject}`, postUser, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        updateContext(postUser);
        updateUser(postUser);
        openSnackBar(
          "Profile information updated",
          SnackbarMessageSeverity.Success
        );
      })
      .catch((error) => {
        console.log(error);
        openSnackBar("Error updating profile", SnackbarMessageSeverity.Error);
      });
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
      <UserForm
        handleSubmit={handleSubmit}
        buttonName={"Update information"}
        user={user}
        handleChange={handleChange}
      ></UserForm>
      <SnackBarComponent
        snackbarDetails={state}
        closeSnack={() => closeSnackbar}
      />
    </>
  );
};

export default UserPage;
