import React from "react";
import "./CambiosTurno.css";

const CambiosTurno = () => {
  return (
    <div className="turno-container">
      <h2 className="turno-titulo">Cambios de turno</h2>

      <div className="turno-filtros">
        <button className="filtro-btn">←</button>
        <button className="filtro-btn">mié, 1 ene – mié, 31 dic 2025</button>
        <button className="filtro-btn">Empleados</button>
        <button className="filtro-btn">Estado: Todos</button>
      </div>

      <div className="turno-panel">
        <div className="turno-icono">🔄</div>
        <div className="turno-texto">
          <h3>Permite a tus empleados solicitar cambios de turno</h3>
          <p>Activa esta función para que tu equipo pueda enviar solicitudes de cambio de turno.</p>
        </div>
        <button className="ajustes-btn">Mostrar ajustes</button>
      </div>

      <div className="turno-vacio">
        <div className="turno-calendario">📅</div>
        <h3>No hay ningún cambio de turno solicitado</h3>
        <p>Ninguna persona de tu plantilla ha solicitado un cambio de turno.</p>
      </div>
    </div>
  );
};

export default CambiosTurno;
