import React, { useState } from "react";
import "./Venta.css";

const productosBase = [
  { nombre: "La clásica", precio: 10.0, imagen: "/burgers/classic.jpg" },
  { nombre: "Hamburguesa con queso", precio: 11.0, imagen: "/burgers/cheese.jpg", descuento: 0.1 },
  { nombre: "Doble tocino", precio: 14.0, imagen: "/burgers/bacon.jpg" },
  { nombre: "Sándwich de pollo frito", precio: 11.5, imagen: "/burgers/chicken.jpg", descuento: 0.15 },
  { nombre: "Hamburguesa con hongos", precio: 10.0, imagen: "/burgers/mushroom.jpg" },
  { nombre: "Hamburguesa vegetariana", precio: 10.0, imagen: "/burgers/veggie.jpg" },
  { nombre: "Explosión", precio: 12.5, imagen: "/burgers/explosion.jpg", descuento: 0.1 },
  { nombre: "Texana", precio: 12.5, imagen: "/burgers/texas.jpg" },
  { nombre: "Atómica", precio: 12.5, imagen: "/burgers/atomic.jpg", descuento: 0.2 },
];

const Venta = () => {
  const [busqueda, setBusqueda] = useState("");
  const [venta, setVenta] = useState([]);
  const [showPagoConfirmacion, setShowPagoConfirmacion] = useState(false);
  const [showPagoView, setShowPagoView] = useState(false);
  const [nota, setNota] = useState("");

  const productosFiltrados = productosBase.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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

  const aumentar = (index) => {
    const updated = [...venta];
    updated[index].cantidad += 1;
    setVenta(updated);
  };

  const disminuir = (index) => {
    const updated = [...venta];
    if (updated[index].cantidad === 1) {
      updated.splice(index, 1);
    } else {
      updated[index].cantidad -= 1;
    }
    setVenta(updated);
  };

  const eliminar = (index) => {
    const updated = [...venta];
    updated.splice(index, 1);
    setVenta(updated);
  };

  const subtotal = venta.reduce((sum, p) => {
    const precioFinal = p.precio * (1 - (p.descuento || 0));
    return sum + precioFinal * p.cantidad;
  }, 0);

  if (showPagoView) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">${subtotal.toFixed(2)}</h2>
        <p className="text-center text-muted">Selecciona un tipo de pago a continuación</p>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <button className="btn btn-outline-secondary">${subtotal.toFixed(2)}</button>
          <button className="btn btn-outline-secondary">${(subtotal + 0.5).toFixed(2)}</button>
          <button className="btn btn-outline-secondary">${(subtotal + 3.5).toFixed(2)}</button>
          <button className="btn btn-outline-secondary">Personalizado</button>
        </div>

        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="bi bi-cash-stack me-2"></i>Efectivo</span>
            <i className="bi bi-chevron-right"></i>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="bi bi-credit-card me-2"></i>Tarjeta guardada</span>
            <i className="bi bi-chevron-right"></i>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="bi bi-gift me-2"></i>Tarjeta de regalo</span>
            <i className="bi bi-chevron-right"></i>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="bi bi-input-cursor-text me-2"></i>Ingreso manual de tarjeta</span>
            <i className="bi bi-chevron-right"></i>
          </li>
        </ul>

        <div className="mt-4 text-center">
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Funcionalidad no implementada aún."); }}>
            Dividir importe
          </a>
        </div>

        <div className="mt-4">
          <label htmlFor="nota" className="form-label">Nota del pago o pedido:</label>
          <textarea
            id="nota"
            className="form-control"
            rows={3}
            placeholder="Ej: Cliente pidió sin cebolla..."
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Panel izquierdo con scroll interno */}
        <div className="col-md-8">
          <div className="mb-3 d-flex gap-3 align-items-center">
            <button className="btn btn-danger">Hamburguesas</button>
            <button className="btn btn-success">Complementos</button>
            <button className="btn btn-primary">Bebidas</button>
            <button
              className="btn btn-outline-success"
              onClick={() => alert("Aplica a productos con 10% o más de descuento.")}
            >
              10% de descuento
            </button>
            <input
              type="text"
              className="form-control w-50 ms-auto"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="row overflow-auto" style={{ maxHeight: "70vh" }}>
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
                    <p className="card-text mb-0">${p.precio.toFixed(2)}</p>
                    {p.descuento && (
                      <p className="text-danger mb-0">-{(p.precio * p.descuento).toFixed(2)} descuento</p>
                    )}
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
            {venta.map((p, i) => {
              const precioFinal = p.precio * (1 - (p.descuento || 0));
              const ahorroTotal = p.precio * p.cantidad - precioFinal * p.cantidad;
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                  <div style={{ flex: 1 }}>
                    <strong>{p.nombre}</strong>
                    <p className="mb-1 text-muted">Cantidad: {p.cantidad}</p>
                    {p.descuento ? (
                      <>
                        <p className="mb-0 text-decoration-line-through text-muted">
                          ${(p.precio * p.cantidad).toFixed(2)}
                        </p>
                        <p className="mb-0 text-danger fw-bold">
                          -${ahorroTotal.toFixed(2)} descuento
                        </p>
                        <p className="mb-0">${(precioFinal * p.cantidad).toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="mb-0">${(p.precio * p.cantidad).toFixed(2)}</p>
                    )}
                  </div>
                  <div className="btn-group ms-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => disminuir(i)}>-</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => aumentar(i)}>+</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i)}>🗑️</button>
                  </div>
                </li>
              );
            })}
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
            <button
              className="btn btn-primary"
              onClick={() => setShowPagoConfirmacion(true)}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>

      {/* Confirmación de pago */}
      {showPagoConfirmacion && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar pago</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPagoConfirmacion(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Deseas continuar al pago por <strong>${subtotal.toFixed(2)}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPagoConfirmacion(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowPagoConfirmacion(false);
                    setShowPagoView(true);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Venta;