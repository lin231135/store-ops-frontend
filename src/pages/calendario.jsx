import React from "react";
import "./calendario.css";

const Calendario = () => {
  return (
    <div className="calendario-container">
      <div className="calendario-toolbar">
        <button className="toolbar-button">Semana ⌄</button>
        <div className="date-range">
          <button className="arrow">←</button>
          <span>11/05/2025–17/05/2025</span>
          <button className="arrow">→</button>
        </div>
        <button className="toolbar-button">Todos los miembros ⌄</button>
        <button className="toolbar-button">Filtrar por ⌄</button>
        <div className="right-actions">
          <button className="toolbar-icon">⋯</button>
          <button className="toolbar-icon">⧉</button>
          <button className="publicar" disabled>Publicar</button>
        </div>
      </div>

      <div className="calendario-empty">
        <div className="calendario-icon">
          📅
        </div>
        <h2>Programar a tu equipo</h2>
        <p>Crea turnos para tu equipo y notifícales automáticamente cuando tengan turnos próximos.</p>
        <button className="blue-button">Agregar miembros del equipo</button>
      </div>
    </div>
  );
};

export default Calendario;
