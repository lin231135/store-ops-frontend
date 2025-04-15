// Este archivo define el contexto de autenticación (login/logout)
// para poder usarlo desde cualquier parte de la app.

import { createContext, useState, useContext } from "react";

// Creamos el contexto
const AuthContext = createContext();

// Proveedor del contexto que maneja si el usuario está autenticado
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // false por defecto

  const login = () => setIsAuthenticated(true); // Llama esto al iniciar sesión
  const logout = () => setIsAuthenticated(false); // Llama esto para cerrar sesión

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);
