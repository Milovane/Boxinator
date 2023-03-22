import "./App.css";
import HomePage from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HistoryPage } from "./pages/HistoryPage";
import { AdminPage } from "./pages/AdminPage";
import React from "react";
import RegisterForm from "./RegisterForm";
import Shipment from "./pages/Shipment";
import { ROLES } from "./const/roles";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import UserPage from "./pages/UserPage"; // Import UserPage component
import { Context } from "./context";
import { useContext } from "react";
import { useState } from "react";
import ShipmentPage from "./pages/ShipmentPage";
import CreateCountryForm from "./components/CountryComponents/CreateCountryForm";

function App() {
  const [context, setContext] = useState({});

  const updateContext = (newContext) => {
    setContext({ ...context, ...newContext });
  };

  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={(event, error) => {
          console.log("onKeycloakEvent", event, error);
        }}
      >
        <BrowserRouter>
          <Context.Provider value={{ context, updateContext }}>
            <Navbar />
            <main className="container md:mx-auto mt-24 mb-24">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                {/* <Route path="/login" element={<LoginFormPage />}></Route> */}
                <Route
                  path="/shipment"
                  element={<ShipmentPage keycloak={keycloak} />}
                ></Route>
                <Route path="/register" element={<RegisterForm />}></Route>
                <Route path="/create-shipment" element={<Shipment />} />

                <Route
                  path="/country"
                  element={
                    <KeycloakRoute role={ROLES.Admin}>
                      <CreateCountryForm />
                    </KeycloakRoute>
                  }
                />
                <Route path="/history" element={<HistoryPage />}></Route>
                {keycloak.authenticated && (
                  <Route path="/user" element={<UserPage />} />
                )}
              </Routes>
            </main>
          </Context.Provider>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
