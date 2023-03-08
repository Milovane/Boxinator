import logo from "./logo.svg";
import "./App.css";
import { User } from "./models/User";
import LoginForm from "./components/login-components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <LoginForm></LoginForm>
    </>
  );
}

export default App;
