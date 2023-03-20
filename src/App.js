import "./App.css";
import { LoginFormPage } from "./pages/LoginFormPage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HistoryPage } from "./pages/HistoryPage";
import { ShipmentPage } from "./pages/ShipmentPage";
import { AdminPage } from "./pages/AdminPage";
import React from "react";
import RegisterForm from "./RegisterForm";
import Shipment from "./pages/Shipment";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import UserPage from "./pages/UserPage"; // Import UserPage component

function App() {
  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={(event, error) => {
          console.log("onKeycloakEvent", event, error);
        }}
      >
        <BrowserRouter>
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<LoginFormPage />}></Route>
              <Route path="/login" element={<LoginFormPage />}></Route>
              <Route path="/shipment" element={<ShipmentPage />}></Route>
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
              <Route path="/history" element={<HistoryPage />}></Route>
              {keycloak.authenticated && (
                <Route path="/user" element={<UserPage />} />
              )}
            </Routes>
          </main>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;