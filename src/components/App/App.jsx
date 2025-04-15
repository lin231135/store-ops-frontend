// Este es el componente principal que define las rutas de la aplicación

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../PrivateRoute";

const App = () => {
  return (
    <Router>
      {/* Menú de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <NavLink className="navbar-brand" to="/">Mi App</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        </div>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta protegida */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        {/* Ruta por defecto */}
        <Route path="/" element={<h2 className="text-center mt-5">Inicio</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
