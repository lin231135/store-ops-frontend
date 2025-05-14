// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext"; // <-- ¡Nuevo!
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TenantProvider>
        <App />
      </TenantProvider>
    </AuthProvider>
  </React.StrictMode>
);