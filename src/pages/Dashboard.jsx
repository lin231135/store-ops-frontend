// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import { useTenant } from "../context/TenantContext"; // <-- Importa el contexto
import { useEffect } from "react";
import TenantTable from "../components/TenantTable"; // Asegúrate de la ruta correcta

const Dashboard = () => {
  const { logout } = useAuth();
  const { fetchTenants } = useTenant(); // <-- Obtén la función para cargar datos

  // Carga los datos al montar el componente
  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Bienvenido al Dashboard</h2>
      <button className="btn btn-danger mb-4" onClick={logout}>
        Cerrar sesión
      </button>
      <TenantTable /> {/* Muestra la tabla aquí */}
    </div>
  );
};

export default Dashboard;