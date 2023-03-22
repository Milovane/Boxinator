import React from "react";
import { Logo } from "./login-components/Logo";
import Link from "./navbar-components/Link";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";
import Button from "@mui/material/Button";
import { ROLES } from "../const/roles";
import SnackBarComponent from "./UserFeedback/SnackBarComponent";
import { SnackbarMessageSeverity } from "../const/SnackbarMessageSeverity";

export const Navbar = () => {
  const [state, setState] = React.useState({
    open: false,
    snackbarMessage: "Empty",
    severity: "success",
  });
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);
  console.log("Context: " + JSON.stringify(context));
  async function checkAuthentication() {
    if (keycloak.authenticated) {
      fetchUserWithId();
    }
  }

  async function fetchUsers() {
    try {
      const apiResponse = await fetch("http://localhost:8080/api/v1/users", {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + keycloak.token,
          "User-Agent": "any-name",
        },
      });

      var users = await apiResponse.json();

      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }

  async function postGuestUser() {
    try {
      const apiResponse = await fetch(
        "http://localhost:8080/api/v1/users/registerGuest",
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            jwt: keycloak.token,
          }),
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + keycloak.token,
            "User-Agent": "any-name",
          },
        }
      );

      //"Access-Control-Allow-Origin": "*",
      console.log("User token: ");
      console.log(keycloak.token);
      var response = await apiResponse.json();
      alert("User posted!");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserWithId() {
    const userId = keycloak.subject;

    try {
      const apiResponse = await fetch(
        `http://localhost:8080/api/v1/users/${userId}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + keycloak.token,
            "User-Agent": "any-name",
          },
        }
      );

      console.log(apiResponse);

      if (apiResponse.ok) {
        //User exists
        var user = await apiResponse.json();
        console.log(user + " hihihi");

        updateContext(user);
        //Todo: remove
        //alert("user exists, navigate to shipment page");
        //navigate("/shipment");
      } else {
        //User does not exist
        //alert("You do not have an account, redirecting to register page");
        openSnackBar(
          "You do not have an account, redirecting to register page",
          SnackbarMessageSeverity.Error
        );
        navigate("/register");
        //for testing purposes, basic guest user
        //postGuestUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logoutFromKeyCloak() {
    navigate("/");
    keycloak.logout();
  }

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
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Logo w="w-8" h="h-8" textColor={"text-dark"} />
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link link="/" name="Home" />
            {keycloak.authenticated && (
              <>
                <Link link="/shipment" name="Shipment" />
                <Link link="/user" name="Profile"></Link>
              </>
            )}

            {keycloak.authenticated && keycloak.hasRealmRole(ROLES.Admin) && (
              <>
                <Link link="/country" name="Countries" />
              </>
            )}

            <section className="actions">
              {!keycloak.authenticated && (
                <Button onClick={() => keycloak.login()} variant="contained">
                  Login
                </Button>
              )}
              {keycloak.authenticated && (
                <>
                  <Button
                    onClick={() => logoutFromKeyCloak()}
                    variant="contained"
                  >
                    Logout
                  </Button>
                </>
              )}
              {
                (keycloak.onAuthSuccess = () => {
                  checkAuthentication();
                })
              }
              {
                (keycloak.onAuthLogout = () => {
                  console.log("Logout user");
                  navigate("/");
                })
              }
            </section>
          </ul>
          {/* For testing, show keycloak token: {keycloak.token && (
            <div>
              <h4>Token</h4>
              <pre>{keycloak.token}</pre>
            </div>
          )} */}
        </div>
      </div>
      <SnackBarComponent
        snackbarDetails={state}
        closeSnack={() => closeSnackbar}
      />
    </nav>
  );
};
