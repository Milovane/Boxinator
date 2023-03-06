import logo from "./logo.svg";
import "./App.css";
import { User } from "./models/User";

function App() {
  console.log(new User("Me"));
  return <div className="App"></div>;
}

export default App;
