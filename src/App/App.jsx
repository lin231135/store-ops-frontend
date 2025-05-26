// Este es el componente principal que define las rutas de la aplicación

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../pages/RegisterPage";
import Reportes from "../pages/Reportes";
import Empleados from "../pages/empleado";
import Calendario from "../pages/calendario";
import Inventario from "../pages/Inventario";
import RegistroHoras from "../pages/RegistroHoras";
import CambiosTurno from "../pages/CambiosTurno";
import Venta from "../pages/Venta";
import CrearDescuento from "../pages/crearDescuento";

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
          <NavLink className="nav-link" to="/reportes">Reportes</NavLink>
          <NavLink className="nav-link" to="/empleado">Empleados</NavLink>
          <NavLink className="nav-link" to="/calendario">Calendario</NavLink>
          <NavLink className="nav-link" to="/inventario">Inventario</NavLink>
          <NavLink className="nav-link" to="/registro-horas">Registro de Horas</NavLink>
          <NavLink className="nav-link" to="/cambios-turno">Cambios de Turno</NavLink>
          <NavLink className="nav-link" to="/venta">Venta</NavLink>
          <NavLink className="nav-link" to="/crear-descuento">Crear Descuento</NavLink>
        </div>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/empleado" element={<Empleados />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/registro-horas" element={<RegistroHoras />} />
        <Route path="/cambios-turno" element={<CambiosTurno />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/crear-descuento" element={<CrearDescuento />} />
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