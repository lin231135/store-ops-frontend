import React from "react";
import "./Venta.css";

const productos = [
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
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Panel izquierdo */}
        <div className="col-md-8">
          <div className="mb-3 d-flex gap-3">
            <button className="btn btn-danger">Hamburguesas</button>
            <button className="btn btn-success">Complementos</button>
            <button className="btn btn-primary">Bebidas</button>
            <button className="btn btn-outline-success">10% de descuento</button>
          </div>

          <div className="row">
            {productos.map((p, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100">
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
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <strong>Hamburguesa con queso</strong>
                <p className="mb-0 text-muted">A punto, Sin Cebolla, Beicon</p>
              </div>
              <span>$12.50</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <strong>Papas fritas</strong>
                <p className="mb-0 text-muted">Regular</p>
              </div>
              <span>$4.00</span>
            </li>
          </ul>

          <div className="mb-2">
            <p className="mb-1">Subtotal: <strong>$16.50</strong></p>
            <p className="mb-1">Total: <strong>$16.50</strong></p>
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