import "./App.css";
import { LoginFormPage } from "./pages/LoginFormPage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { HistoryPage } from "./pages/HistoryPage";
import { ShipmentPage } from "./pages/ShipmentPage";
import React from 'react';
import RegisterForm from './RegisterForm';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LoginFormPage />}></Route>
        <Route path="/login" element={<LoginFormPage />}></Route>
        <Route path="/shipment" element={<ShipmentPage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
