// Componente que protege rutas: si el usuario no está autenticado, lo redirige al login

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si está logueado, muestra la vista protegida. Si no, lo redirige a /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
