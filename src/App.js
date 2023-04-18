import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HistoryPage } from "./pages/HistoryPage";
import React from "react";
import RegisterForm from "./RegisterForm";
import Shipment from "./pages/Shipment";
import { ROLES } from "./const/roles";
import KeycloakRoute from "./routes/KeycloakRoute";
import keycloak from "./keycloak";
import UserPage from "./pages/UserPage"; // Import UserPage component
import { Context } from "./context";
import { useState } from "react";
import ShipmentPage from "./pages/ShipmentPage";
import CreateCountryForm from "./components/CountryComponents/CreateCountryForm";
import AdminPage from "./pages/AdminPage";
import ManageShipmentsPage from "./pages/ManageShipmentsPage";
import ProfilePage from "./pages/ProfilePage";
import NavbarNew from "./components/NavbarNew";

function App() {
  const [context, setContext] = useState({});

  const updateContext = (newContext) => {
    setContext({ ...context, ...newContext });
  };

  return (
    <>
      {/* <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={(event, error) => {
          console.log("onKeycloakEvent", event, error);
        }}
      > */}
      <Context.Provider value={{ context, updateContext }}>
        <NavbarNew />
        {/* <Navbar /> */}
        <main className="container mx-auto mt-4 mb-24">
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
              path="/admin"
              element={
                <KeycloakRoute role={ROLES.Admin}>
                  <AdminPage />
                </KeycloakRoute>
              }
            />

            <Route
              path="/country"
              element={
                <KeycloakRoute role={ROLES.Admin}>
                  <CreateCountryForm />
                </KeycloakRoute>
              }
            />

            <Route
              path="/manage-shipments"
              element={
                <KeycloakRoute role={ROLES.Admin}>
                  <ManageShipmentsPage keycloak={keycloak} />
                </KeycloakRoute>
              }
            />

            <Route path="/history" element={<HistoryPage />}></Route>
            {keycloak.authenticated && (
              <Route path="/user" element={<UserPage />} />
            )}
            {keycloak.authenticated && (
              <Route path="/profile" element={<ProfilePage />} />
            )}
          </Routes>
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
