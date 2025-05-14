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

  // Filtrar productos
  const productosFiltrados = productosBase.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agregar producto a la venta
  const agregarProducto = (producto) => {
    setVenta((prev) => {
      const index = prev.findIndex((item) => item.nombre === producto.nombre);
      if (index >= 0) {
        const updated = [...prev];
        updated[index].cantidad += 1;
        return updated;
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Incrementar cantidad
  const aumentar = (index) => {
    const updated = [...venta];
    updated[index].cantidad += 1;
    setVenta(updated);
  };

  // Disminuir cantidad o eliminar si es 1
  const disminuir = (index) => {
    const updated = [...venta];
    if (updated[index].cantidad === 1) {
      updated.splice(index, 1);
    } else {
      updated[index].cantidad -= 1;
    }
    setVenta(updated);
  };

  // Eliminar producto directamente
  const eliminar = (index) => {
    const updated = [...venta];
    updated.splice(index, 1);
    setVenta(updated);
  };

  const subtotal = venta.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

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
                  className="card h-100"
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

        {/* Panel derecho */}
        <div className="col-md-4 border-start ps-4">
          <h5>Venta nueva</h5>
          <ul className="list-group mb-3">
            {venta.map((p, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                <div style={{ flex: 1 }}>
                  <strong>{p.nombre}</strong>
                  <p className="mb-1 text-muted">Cantidad: {p.cantidad}</p>
                  <p className="mb-0">${(p.precio * p.cantidad).toFixed(2)}</p>
                </div>
                <div className="btn-group ms-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => disminuir(i)}>-</button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => aumentar(i)}>+</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️</button>
                </div>
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