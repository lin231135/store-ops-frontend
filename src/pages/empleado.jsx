import React from "react";
import "./empleado.css";

const Empleados = () => {
  return (
    <div className="empleados-container">
      <div className="empleados-header">
        <h2>Empleados</h2>
        <button className="add-button">Añadir empleado</button>
      </div>

      <div className="filters">
        <input type="text" placeholder=" Buscar" className="search-input" />
        <select className="position-filter">
          <option value="">Puesto</option>
          <option value="propietario">Propietario</option>
          <option value="gerente">Gerente</option>
        </select>
      </div>

      <table className="empleados-table">
        <thead>
          <tr>
            <th>Nombre </th>
            <th>Puesto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="nombre-col">
              Empleado
            </td>
            <td>Propietario</td>
            <td>
              <span className="estado incompleto">Activo</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="total"># Cantidad de Empleados</div>
    </div>
  );
};

export default Empleados;
