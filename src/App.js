import logo from "./logo.svg";
import "./App.css";
import { User } from "./models/User";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { History } from "./components/History";
import { Shipment } from "./components/Shipment";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/shipment" element={<Shipment />}></Route>
        <Route
          path="/history"
          element={
            <RequireAuth loginPath="/login">
              <History />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
