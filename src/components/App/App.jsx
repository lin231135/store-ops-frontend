// Este es el componente principal que define las rutas de la aplicación

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../PrivateRoute";
import Register from "../../pages/RegisterPage";
import AdmPage from "../../pages/AdmPage";
import GerentePage from "../../pages/GerentePage";
import CajeroPage from "../../pages/CajeroPage";
import BodegueroPage from "../../pages/BodegueroPage";
import Empleados from "../../pages/empleado";
import Calendario from "../../pages/calendario";
import Inventario from "../../pages/Inventario";

const App = () => {
  return (
    <Router>
      {/* Menú de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <NavLink className="navbar-brand" to="/">Mi App</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link" to="/register">Registrar</NavLink>
          <NavLink className="nav-link" to="/adm">Administrador</NavLink>
          <NavLink className="nav-link" to="/gerente">Gerente</NavLink>
          <NavLink className="nav-link" to="/cajero">Cajero</NavLink>
          <NavLink className="nav-link" to="/bodeguero">Bodeguero</NavLink>
          <NavLink className="nav-link" to="/empleado">Empleados</NavLink>
          <NavLink className="nav-link" to="/calendario">Calendario</NavLink>
          <NavLink className="nav-link" to="/inventario">Inventario</NavLink>
        </div>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adm" element={<AdmPage />} />
        <Route path="/gerente" element={<GerentePage />} />
        <Route path="/cajero" element={<CajeroPage />} />
        <Route path="/bodeguero" element={<BodegueroPage />} />
        <Route path="/empleado" element={<Empleados />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/inventario" element={<Inventario />} />
        

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
