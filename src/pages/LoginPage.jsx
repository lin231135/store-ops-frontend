import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginEmpleado } from "../services";

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginEmpleado(username, password);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="vh-100 fondo-animado">
      <div className="container-fluid h-100">
        <div className="row">
          <div className="col-sm-6 text-black d-flex align-items-center justify-content-center fondo-animado">
            <div style={{ width: '100%', maxWidth: '400px' }} className="p-4">
              <div className="mb-4 text-center">
                <img src="/Logo.svg" height="150" alt="Logo" className="me-2" />
              </div>

              <form onSubmit={handleLogin}>
                <h3 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsuario"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="inputUsuario">Usuario</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="inputPassword">Contraseña</label>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-info btn-lg w-100">Login</button>
                </div>

                <p className="small text-center mb-0">
                  <a href='#' className="text-muted">¿Olvidaste tu contraseña?</a>
                </p>
              </form>
            </div>
          </div>

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