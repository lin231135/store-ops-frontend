// Esta es la página de inicio de sesión

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth(); // Accedemos al método login del contexto
  const navigate = useNavigate(); // Para redirigir

  const handleLogin = () => {
    login(); // Simula que el usuario se autenticó
    navigate("/dashboard"); // Redirige a la vista protegida
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default LoginPage;
