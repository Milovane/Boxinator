import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import { initialize } from "./keycloak";
import Loading from "./components/loading/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Loading message="Connecting to Keycloak..." />);

// Initialize Keycloak
initialize()
  .then(() => {
    // If No Keycloak Error occurred - Display the App
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })
  .catch(() => {
    root.render(
      <BrowserRouter>
        <p>Could Not Connect To Keycloak.</p>
      </BrowserRouter>
    );
  });

// root.render(
//   <React.StrictMode>
//     <AuthProvider
//       authType={"cookie"}
//       authName={"_auth"}
//       cookieDomain={window.location.hostname}
//       cookieSecure={false}
//     >
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );
