import React from "react";
import "./RegistroHoras.css";

const RegistroHoras = () => {
  return (
    <div className="registro-container">
      <h2 className="registro-titulo">
        Todos los miembros del equipo: 12 de Mayo de 2025
      </h2>

      <div className="registro-toolbar">
        <div className="registro-filtros">
          <button className="filtro-btn">←</button>
          <button className="filtro-btn">lun. 12 de mayo de 2025 ⌄</button>
          <button className="filtro-btn">Todo el día ⌄</button>
          <button className="filtro-btn">Ver por: Nombre, apellido ⌄</button>
        </div>
        <div className="registro-acciones">
          <button className="filtro-btn">Exportar ⌄</button>
          <button className="blue-btn">Agregar registro de horas</button>
        </div>
      </div>

      <div className="registro-vacio">
        <div className="icono-horario">🕒</div>
        <h3>Dar seguimiento a horario</h3>
        <p>
          Permita a miembros del equipo marcar entrada y salida en punto de venta o ingresar horas manualmente.
          Square calculará las horas y el tiempo extra para una nómina simplificada.
        </p>
        <button className="blue-btn">Agregar miembros del equipo</button>
      </div>
    </div>
  );
};

export default RegistroHoras;
