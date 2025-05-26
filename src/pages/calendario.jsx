import React, { useState } from "react";
import "./calendario.css";
import { addDays, startOfWeek, endOfWeek, format } from "date-fns";

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [turnos, setTurnos] = useState([]);
  const [miembros, setMiembros] = useState(["Carlos", "Ana", "Lucía"]);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState("Todos");

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  const handlePrevWeek = () => setCurrentDate(prev => addDays(prev, -7));
  const handleNextWeek = () => setCurrentDate(prev => addDays(prev, 7));

  const agregarMiembro = () => {
    const nuevo = prompt("Nombre del nuevo miembro:");
    if (nuevo && !miembros.includes(nuevo)) {
      setMiembros([...miembros, nuevo]);
    }
  };

  const agregarTurno = () => {
    if (miembros.length === 0) return alert("Agrega miembros primero.");
    const miembro = prompt(`¿Para qué miembro deseas asignar el turno? (${miembros.join(", ")})`);
    if (miembro && miembros.includes(miembro)) {
      setTurnos([...turnos, { id: Date.now(), persona: miembro, dia: format(currentDate, "eeee") }]);
    }
  };

  const turnosFiltrados = miembroSeleccionado === "Todos"
    ? turnos
    : turnos.filter(t => t.persona === miembroSeleccionado);

  return (
    <div className="calendario-container">
      <div className="calendario-toolbar">
        <button className="toolbar-button">Semana ⌄</button>

        <div className="date-range">
          <button className="arrow" onClick={handlePrevWeek}>←</button>
          <span>{format(start, "dd/MM/yyyy")}–{format(end, "dd/MM/yyyy")}</span>
          <button className="arrow" onClick={handleNextWeek}>→</button>
        </div>

        <select
          className="toolbar-button"
          value={miembroSeleccionado}
          onChange={e => setMiembroSeleccionado(e.target.value)}
        >
          <option value="Todos">Todos los miembros</option>
          {miembros.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button className="toolbar-button" onClick={agregarTurno}>+ Agregar turno</button>

        <div className="right-actions">
          <button className="toolbar-icon">⋯</button>
          <button className="toolbar-icon">⧉</button>
          <button className="publicar" disabled={turnos.length === 0}>Publicar</button>
        </div>
      </div>

      {turnosFiltrados.length === 0 ? (
        <div className="calendario-empty">
          <div className="calendario-icon">📅</div>
          <h2>Programar a tu equipo</h2>
          <p>Crea turnos para tu equipo y notifícales automáticamente cuando tengan turnos próximos.</p>
          <button className="blue-button" onClick={agregarMiembro}>Agregar miembros del equipo</button>
        </div>
      ) : (
        <div className="turnos-list">
          <h3>Turnos programados:</h3>
          <ul>
            {turnosFiltrados.map(t => (
              <li key={t.id}>
                {t.persona} - {t.dia}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendario;
