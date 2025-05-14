import React, { useState } from "react";
import "./Venta.css";

const productosBase = [
  { nombre: "La clásica", precio: 10.0, imagen: "/burgers/classic.jpg" },
  { nombre: "Hamburguesa con queso", precio: 11.0, imagen: "/burgers/cheese.jpg" },
  { nombre: "Doble tocino", precio: 14.0, imagen: "/burgers/bacon.jpg" },
  { nombre: "Sándwich de pollo frito", precio: 11.5, imagen: "/burgers/chicken.jpg" },
  { nombre: "Hamburguesa con hongos", precio: 10.0, imagen: "/burgers/mushroom.jpg" },
  { nombre: "Hamburguesa vegetariana", precio: 10.0, imagen: "/burgers/veggie.jpg" },
  { nombre: "Explosión", precio: 12.5, imagen: "/burgers/explosion.jpg" },
  { nombre: "Texana", precio: 12.5, imagen: "/burgers/texas.jpg" },
  { nombre: "Atómica", precio: 12.5, imagen: "/burgers/atomic.jpg" },
];

const Venta = () => {
  const [busqueda, setBusqueda] = useState("");
  const [venta, setVenta] = useState([]);

  // Filtra los productos según la búsqueda
  const productosFiltrados = productosBase.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agrega producto al pedido
  const agregarProducto = (producto) => {
    setVenta((prev) => [...prev, producto]);
  };

  // Calcula totales
  const subtotal = venta.reduce((sum, p) => sum + p.precio, 0);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Panel izquierdo */}
        <div className="col-md-8">
          <div className="mb-3 d-flex gap-3 align-items-center">
            <button className="btn btn-danger">Hamburguesas</button>
            <button className="btn btn-success">Complementos</button>
            <button className="btn btn-primary">Bebidas</button>
            <button className="btn btn-outline-success">10% de descuento</button>
            <input
              type="text"
              className="form-control w-50 ms-auto"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="row">
            {productosFiltrados.map((p, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div
                  className="card h-100 cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => agregarProducto(p)}
                >
                  <img
                    src={p.imagen}
                    className="card-img-top"
                    alt={p.nombre}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{p.nombre}</h6>
                    <p className="card-text">${p.precio.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho - Orden */}
        <div className="col-md-4 border-start ps-4">
          <h5>Venta nueva</h5>
          <ul className="list-group mb-3">
            {venta.map((p, i) => (
              <li className="list-group-item d-flex justify-content-between" key={i}>
                <div>
                  <strong>{p.nombre}</strong>
                  <p className="mb-0 text-muted">Fingido</p>
                </div>
                <span>${p.precio.toFixed(2)}</span>
              </li>
            ))}
            {venta.length === 0 && (
              <li className="list-group-item text-center text-muted">
                No hay productos agregados
              </li>
            )}
          </ul>

          <div className="mb-2">
            <p className="mb-1">Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
            <p className="mb-1">Total: <strong>${subtotal.toFixed(2)}</strong></p>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-success">Envíar a cocina</button>
            <button className="btn btn-primary">Pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venta;