// src/context/TenantContext.jsx
import { createContext, useState, useContext } from "react";
import { getAllTenants } from "../services/tenantService";

export const TenantContext = createContext(); // <-- Exporta el contexto aquí

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    try {
      const data = await getAllTenants();
      setTenants(data);
    } catch (error) {
      console.error("Error cargando tenants:", error);
    }
  };

  return (
    <TenantContext.Provider value={{ tenants, fetchTenants }}>
      {children}
    </TenantContext.Provider>
  );
};

// Opcional: Si usas el hook useTenant, déjalo así
export const useTenant = () => useContext(TenantContext);