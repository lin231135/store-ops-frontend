import React, { useState, useEffect } from "react";
import "./crearDescuento.css";

const CrearDescuento = () => {
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [montoMinimo, setMontoMinimo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuentos, setDescuentos] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    const descuentosGuardados = JSON.parse(localStorage.getItem("descuentos")) || [];
    setDescuentos(descuentosGuardados);
  }, []);

  const limpiarCampos = () => {
    setNombre("");
    setValor("");
    setMontoMinimo("");
    setDescripcion("");
    setEditandoIndex(null);
  };

  const guardarDescuento = () => {
    if (!nombre || valor === "" || montoMinimo === "") {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const descuentoProcesado = {
      nombre,
      valor: parseFloat(valor) / 100,
      montoMinimo: parseFloat(montoMinimo),
      descripcion,
    };

    let nuevosDescuentos = [...descuentos];

    if (editandoIndex !== null) {
      nuevosDescuentos[editandoIndex] = descuentoProcesado;
      alert("Descuento actualizado correctamente.");
    } else {
      nuevosDescuentos.push(descuentoProcesado);
      alert("Descuento guardado exitosamente.");
    }

    localStorage.setItem("descuentos", JSON.stringify(nuevosDescuentos));
    setDescuentos(nuevosDescuentos);
    limpiarCampos();
  };

  const eliminarDescuento = (index) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este descuento?")) return;

    const nuevosDescuentos = [...descuentos];
    nuevosDescuentos.splice(index, 1);
    localStorage.setItem("descuentos", JSON.stringify(nuevosDescuentos));
    setDescuentos(nuevosDescuentos);
    limpiarCampos();
  };

  const editarDescuento = (index) => {
    const d = descuentos[index];
    setNombre(d.nombre);
    setValor((d.valor * 100).toString());
    setMontoMinimo(d.montoMinimo.toString());
    setDescripcion(d.descripcion || "");
    setEditandoIndex(index);
  };

  return (
    <div className="container mt-5 descuento-container">
      <h2 className="section-title">
        {editandoIndex !== null ? "Editar descuento" : "Crear nuevo descuento"}
      </h2>

      <div className="mb-3">
        <label className="form-label">Nombre del descuento</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Valor del descuento (%)</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          placeholder="Ej. 10 para 10%"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Monto mínimo para aplicar descuento (Q)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={montoMinimo}
          onChange={(e) => setMontoMinimo(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Descripción (opcional)</label>
        <textarea
          className="form-control"
          rows="2"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="text-end mb-4">
        <button className="btn btn-primary me-2" onClick={guardarDescuento}>
          {editandoIndex !== null ? "Actualizar" : "Guardar"}
        </button>
        {editandoIndex !== null && (
          <button className="btn btn-secondary" onClick={limpiarCampos}>
            Cancelar edición
          </button>
        )}
      </div>

      <h4 className="section-title">Descuentos guardados</h4>
      {descuentos.length === 0 ? (
        <p>No hay descuentos registrados.</p>
      ) : (
        <div className="auto-rule-box">
          <ul className="list-group">
            {descuentos.map((d, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{d.nombre}</strong> — {d.valor * 100}% — Mínimo Q{d.montoMinimo}
                  {d.descripcion && (
                    <div>
                      <em>{d.descripcion}</em>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editarDescuento(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarDescuento(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CrearDescuento;
