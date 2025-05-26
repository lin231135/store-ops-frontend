import React, { useState } from "react";
import "./empleado.css";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Ana López", puesto: "Propietario", estado: "Activo" },
    { id: 2, nombre: "Luis Pérez", puesto: "Gerente", estado: "Activo" },
    { id: 3, nombre: "Marta Sánchez", puesto: "Gerente", estado: "Inactivo" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroPuesto, setFiltroPuesto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [empleadoActual, setEmpleadoActual] = useState({ nombre: "", puesto: "", estado: "Activo" });

  const empleadosFiltrados = empleados.filter((emp) => {
    const coincideNombre = emp.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincidePuesto = filtroPuesto === "" || emp.puesto === filtroPuesto;
    const coincideEstado = filtroEstado === "" || emp.estado === filtroEstado;
    return coincideNombre && coincidePuesto && coincideEstado;
  });

  const abrirModalNuevo = () => {
    setEmpleadoActual({ nombre: "", puesto: "", estado: "Activo" });
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const abrirModalEditar = (empleado) => {
    setEmpleadoActual(empleado);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const guardarEmpleado = () => {
    if (!empleadoActual.nombre || !empleadoActual.puesto) return;

    if (modoEdicion) {
      setEmpleados((prev) =>
        prev.map((emp) =>
          emp.id === empleadoActual.id ? empleadoActual : emp
        )
      );
    } else {
      const nuevoEmpleado = {
        ...empleadoActual,
        id: Date.now(),
      };
      setEmpleados((prev) => [...prev, nuevoEmpleado]);
    }

    setMostrarModal(false);
  };

  const eliminarEmpleado = (id) => {
    if (window.confirm("¿Eliminar este empleado?")) {
      setEmpleados((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="empleados-container">
      <div className="empleados-header">
        <h2>Empleados</h2>
        <button className="add-button" onClick={abrirModalNuevo}>
          Añadir empleado
        </button>
      </div>

      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar"
          className="search-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="position-filter"
          value={filtroPuesto}
          onChange={(e) => setFiltroPuesto(e.target.value)}
        >
          <option value="">Puesto</option>
          <option value="Propietario">Propietario</option>
          <option value="Gerente">Gerente</option>
        </select>
        <select
          className="position-filter"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Tabla */}
      <table className="empleados-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosFiltrados.map((emp) => (
            <tr key={emp.id}>
              <td className="nombre-col">{emp.nombre}</td>
              <td>{emp.puesto}</td>
              <td>
                <span className={`estado ${emp.estado === "Activo" ? "incompleto" : ""}`}>
                  {emp.estado}
                </span>
              </td>
              <td>
                <button onClick={() => abrirModalEditar(emp)}>Editar</button>
                <button onClick={() => eliminarEmpleado(emp.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {empleadosFiltrados.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No se encontraron empleados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="total">Total de empleados mostrados: {empleadosFiltrados.length}</div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modoEdicion ? "Editar" : "Nuevo"} Empleado</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={empleadoActual.nombre}
              onChange={(e) => setEmpleadoActual({ ...empleadoActual, nombre: e.target.value })}
            />
            <select
              value={empleadoActual.puesto}
              onChange={(e) => setEmpleadoActual({ ...empleadoActual, puesto: e.target.value })}
            >
              <option value="">Seleccione Puesto</option>
              <option value="Propietario">Propietario</option>
              <option value="Gerente">Gerente</option>
            </select>
            <select
              value={empleadoActual.estado}
              onChange={(e) => setEmpleadoActual({ ...empleadoActual, estado: e.target.value })}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={guardarEmpleado} className="add-button">
                Guardar
              </button>
              <button onClick={() => setMostrarModal(false)} style={{ marginLeft: "1rem" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
