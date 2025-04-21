// Esta es la página de inicio de sesión

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';

const LoginPage = () => {
  const { login } = useAuth(); // Accedemos al método login del contexto
  const navigate = useNavigate(); // Para redirigir

  const handleLogin = () => {
    login(); // Simula que el usuario se autenticó
    navigate("/dashboard"); // Redirige a la vista protegida
  };

  return (
    <section className="vh-100 fondo-animado">
    <div className="container-fluid h-100">
        <div className="row">
          
          {/* Columna del login */}
          <div className="col-sm-6 text-black d-flex align-items-center justify-content-center fondo-animado">
            <div style={{ width: '100%', maxWidth: '400px' }} className="p-4">
                <div className="mb-4 text-center">
                    <img src="/Logo.svg" height="150" alt="Logo" className="me-2" />
                    </div>

                    <form>
                    <h3 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>

                    <div className="form-floating mb-4">
                        <input
                        type="email"
                        className="form-control"
                        id="inputCorreo"
                        placeholder="Correo electrónico"
                        required
                        />
                        <label htmlFor="inputCorreo">Correo electrónico</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Contraseña"
                        required
                        />
                        <label htmlFor="inputPassword">Contraseña</label>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-info btn-lg w-100" onClick={handleLogin}>Login</button>
                    </div>

                    <p className="small text-center mb-0">
                        <a href="#" className="text-muted">¿Olvidaste tu contraseña?</a>
                    </p>
                    </form>
                </div>
            </div>


          {/* Columna de imagen */}
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login"
              className="w-100 vh-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
