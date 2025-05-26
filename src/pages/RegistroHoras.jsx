import React, { useState } from "react";
import { format, subDays, addDays } from "date-fns";
import "./RegistroHoras.css";

const RegistroHoras = () => {
  const [fecha, setFecha] = useState(new Date());
  const [miembros, setMiembros] = useState([
    // Datos de ejemplo
    { id: 1, nombre: "Carlos Pérez", entrada: "08:00", salida: "16:00", fecha: "2025-05-12" },
    { id: 2, nombre: "Ana Gómez", entrada: "09:00", salida: "17:00", fecha: "2025-05-12" }
  ]);

  const fechaFormateada = format(fecha, "yyyy-MM-dd");
  const fechaVisible = format(fecha, "eeee d 'de' MMMM 'de' yyyy", { locale: undefined });

  const cambiarDia = (delta) => setFecha(prev => addDays(prev, delta));

  const agregarRegistro = () => {
    const nombre = prompt("Nombre del miembro:");
    const entrada = prompt("Hora de entrada (formato HH:mm):");
    const salida = prompt("Hora de salida (formato HH:mm):");

    if (nombre && entrada && salida) {
      setMiembros(prev => [
        ...prev,
        {
          id: Date.now(),
          nombre,
          entrada,
          salida,
          fecha: fechaFormateada
        }
      ]);
    }
  };

  const registrosDelDia = miembros
    .filter(m => m.fecha === fechaFormateada)
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div className="registro-container">
      <h2 className="registro-titulo">
        Todos los miembros del equipo: {fechaVisible}
      </h2>

      <div className="registro-toolbar">
        <div className="registro-filtros">
          <button className="filtro-btn" onClick={() => cambiarDia(-1)}>←</button>
          <button className="filtro-btn">{fechaVisible} ⌄</button>
          <button className="filtro-btn">Todo el día ⌄</button>
          <button className="filtro-btn">Ver por: Nombre, apellido ⌄</button>
        </div>
        <div className="registro-acciones">
          <button className="filtro-btn">Exportar ⌄</button>
          <button className="blue-btn" onClick={agregarRegistro}>Agregar registro de horas</button>
        </div>
      </div>

      {registrosDelDia.length === 0 ? (
        <div className="registro-vacio">
          <div className="icono-horario">🕒</div>
          <h3>Dar seguimiento a horario</h3>
          <p>
            Permita a miembros del equipo marcar entrada y salida en punto de venta o ingresar horas manualmente.
            Square calculará las horas y el tiempo extra para una nómina simplificada.
          </p>
          <button className="blue-btn">Agregar miembros del equipo</button>
        </div>
      ) : (
        <div className="registro-lista">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Hora de entrada</th>
                <th>Hora de salida</th>
              </tr>
            </thead>
            <tbody>
              {registrosDelDia.map(registro => (
                <tr key={registro.id}>
                  <td>{registro.nombre}</td>
                  <td>{registro.entrada}</td>
                  <td>{registro.salida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistroHoras;
