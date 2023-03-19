import "./App.css";
import { LoginFormPage } from "./pages/LoginFormPage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { HistoryPage } from "./pages/HistoryPage";
import { ShipmentPage } from "./pages/ShipmentPage";
import React from "react";
import RegisterForm from "./RegisterForm";
import Shipment from "./pages/Shipment";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<LoginFormPage />}></Route>
            <Route path="/login" element={<LoginFormPage />}></Route>
            <Route path="/shipment" element={<ShipmentPage />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/create-shipment" element={<Shipment />} />
            <Route path="/history" element={<HistoryPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
