import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [genero, setGenero] = useState("");

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const obtenerIconoGenero = () => {
    if (genero === "masculino") return <i className="bi bi-gender-male icono-animado"></i>;
    if (genero === "femenino") return <i className="bi bi-gender-female icono-animado"></i>;
    return <i className="bi bi-gender-ambiguous icono-animado"></i>;
  };

  return (
    <div className="fondo-animado">
      <h2 className="letra">Registro de Usuario</h2>
      <div className="card form-container">
        <form>
          <div className="row">

            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input type="text" className="form-control" placeholder="Nombre" />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input type="email" className="form-control" placeholder="correo@ejemplo.com" />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input type="password" className="form-control" placeholder="Contraseña" />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-people"></i>
                </span>
                <select className="form-select">
                  <option value="">Selecciona el tipo de usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="gerente">Gerente</option>
                  <option value="cajero">Cajero</option>
                  <option value="bodeguero">Bodeguero</option>
                </select>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input type="date" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de Ingreso</label>
              <input type="date" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  {obtenerIconoGenero()}
                </span>
                <select className="form-select" onChange={handleGeneroChange}>
                  <option value="">Selecciona el género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>
            </div>

          </div>

          <div className="mt-4 text-center">
            <button type="submit" className="button">Registrar Usuario</button>
            <a href='./Login'>Regresar a Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
