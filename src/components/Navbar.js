import React from "react";
import { Logo } from "./login-components/Logo";
import Link from "./navbar-components/Link";
//import keycloak from "../keycloak";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  async function checkAuthentication() {
    if (keycloak.authenticated) {
      // //alert("Authentication successful");
      // navigate("/register");
      // alert("Fetch from API");
      // fetchUsers();
    } else {
      //navigate("/");
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

      //"Access-Control-Allow-Origin": "*",
      var users = await apiResponse.json();

      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <Logo w="w-8" h="h-8" textColor={"text-dark"} />
        <div class="flex md:order-2">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link link="#" name="Home" />
            <Link link="#" name="About" />
            <Link link="/shipment" name="Shipment" />
            <Link link="/history" name="History" />
            <Link link="#" name="Contact" />
            <section className="actions">
              {!keycloak.authenticated && (
                <button
                  onClick={
                    () => keycloak.login()
                    // keycloak.login().onAuthSuccess(successfulAuthentication())
                  }
                >
                  Login
                </button>
              )}
              {keycloak.authenticated && (
                <button onClick={() => keycloak.logout()}>Logout</button>
              )}

              {/* {successfulAuthentication()} */}
              {
                (keycloak.onAuthSuccess = () => {
                  //Fetch primary key/subject from DB, if it exists
                  //navigate to shipments page?
                  //if user does not exist, continue to register page
                  alert("Successful authentication, navigate to register page");
                  //navigate("/register");
                  checkAuthentication();
                })
              }
            </section>
          </ul>
          {/* {keycloak.token && (
            <div>
              <h4>Token</h4>
              <pre>{keycloak.token}</pre>
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
};
