// Este es el componente principal que define las rutas de la aplicación
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 Importar hook
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
import logo from '/Logo.svg';

const App = () => {
  const { auth, logout } = useAuth(); // 👈 auth para saber si está logueado

  return (
    <Router>
      {/* Menú de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4" color="gray">
        <NavLink className="navbar-brand" to="/">
          <img src="/Logo.svg" height="75" alt="Logo" className="me-2" />
        </NavLink>
        <div className="navbar-nav">
          {!auth && <NavLink className="nav-link" to="/login">Login</NavLink>}

          {auth && (
            <>
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
            </>
          )}
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/reportes" element={<PrivateRoute><Reportes /></PrivateRoute>} />
        <Route path="/empleado" element={<PrivateRoute><Empleados /></PrivateRoute>} />
        <Route path="/calendario" element={<PrivateRoute><Calendario /></PrivateRoute>} />
        <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} />
        <Route path="/registro-horas" element={<PrivateRoute><RegistroHoras /></PrivateRoute>} />
        <Route path="/cambios-turno" element={<PrivateRoute><CambiosTurno /></PrivateRoute>} />
        <Route path="/venta" element={<PrivateRoute><Venta /></PrivateRoute>} />
        <Route path="/crear-descuento" element={<PrivateRoute><CrearDescuento /></PrivateRoute>} />
        <Route path="/" element={<h2 className="text-center mt-5">Inicio</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
