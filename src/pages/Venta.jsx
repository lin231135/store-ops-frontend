import React, { useEffect, useState } from "react";
import useDescuentos from "../hooks/useDescuentos";
import "./Venta.css";

const productosBase = [
  { nombre: "La clásica", precio: 10.0, imagen: "https://media.istockphoto.com/id/520410807/es/foto/hamburguesa-con-queso.jpg?s=612x612&w=0&k=20&c=YDYCsfNMOHATJlvcswo7mjebVeLOtctrQeUPJGlR3jc=" },
  { nombre: "Hamburguesa con queso", precio: 11.0, imagen: "https://media.istockphoto.com/id/945057664/es/foto/hamburguesa-con-queso.jpg?s=612x612&w=0&k=20&c=ACWtZaloxkz7pWR7dL642VuZmUKTgnre35RJnv4eXDc=", descuento: 0.1 },
  { nombre: "Doble tocino", precio: 14.0, imagen: "https://media.istockphoto.com/id/840902892/es/foto/hamburguesa-aislado-en-blanco.jpg?s=612x612&w=0&k=20&c=uQIMRE1GPy8nh_WiCmK70qg30fjUaxnStPLVR2KLJHU=" },
  { nombre: "Sándwich de pollo frito", precio: 11.5, imagen: "https://cdn7.kiwilimon.com/recetaimagen/14209/960x640/11960.jpg.jpg", descuento: 0.15 },
  { nombre: "Hamburguesa con hongos", precio: 10.0, imagen: "https://assets.unileversolutions.com/recipes-v2/245630.jpg" },
  { nombre: "Hamburguesa vegetariana", precio: 10.0, imagen: "https://media.istockphoto.com/id/1448322070/es/foto/sabrosa-hamburguesa-fresca-en-mesa-de-madera.jpg?s=612x612&w=0&k=20&c=JrAb5GidOn0_mUEnsncdUQfmKwKtYC5p-JemGfpQN0w=" },
  { nombre: "Explosión", precio: 12.5, imagen: "https://media.istockphoto.com/id/2148672887/es/foto/hamburguesa-de-ternera-con-verduras-y-lechuga-sobre-fondo-blanco-el-archivo-contiene-el.jpg?s=612x612&w=0&k=20&c=lHRXTLU8aQNkkg7MQix-PEcXd9411pyR-QJZ5g6Fe2c=", descuento: 0.1 },
  { nombre: "Texana", precio: 12.5, imagen: "https://media.istockphoto.com/id/617759204/es/foto/asador-doble-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=gwLCwkXFsysV-5dvBGcDFz8zlll_kOLD1YoimQrdZMQ=" },
  { nombre: "Atómica", precio: 12.5, imagen: "https://media.istockphoto.com/id/2061716709/es/foto/hamburguesa-de-costilla-a-la-plancha.jpg?s=612x612&w=0&k=20&c=lD6WuLxIJ26xm2cmSSQXwG_pK4WHCv8HZ3Yj-qCDEWE=", descuento: 0.2 },
];

const Venta = () => {
  const [busqueda, setBusqueda] = useState("");
  const [venta, setVenta] = useState([]);
  const [showPagoConfirmacion, setShowPagoConfirmacion] = useState(false);
  const [showPagoView, setShowPagoView] = useState(false);
  const [nota, setNota] = useState("");
  const [mostrarRecibo, setMostrarRecibo] = useState(false);
  const [selectedDescuentoIndex, setSelectedDescuentoIndex] = useState(null);
  const [showModalDescuentos, setShowModalDescuentos] = useState(false);

  const {
    descuentos,
    descuentoAplicado,
    error,
    aplicarDescuento,
    setError
  } = useDescuentos();

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
    const descuento = p.descuento || 0;
    const precioFinal = p.precio * (1 - descuento);
    return sum + precioFinal * p.cantidad;
  }, 0);

  /*const [descuentos, setDescuentos] = useState([
    { nombre: "10% en hamburguesas", valor: 0.1 },
    { nombre: "15% en sándwiches", valor: 0.15 }
  ]);

  const [showModalDescuentos, setShowModalDescuentos] = useState(false);
  useEffect(() => {
    if (showModalDescuentos) {
      const descuentosGuardados = JSON.parse(localStorage.getItem("descuentos")) || [];
      setDescuentos(descuentosGuardados);
    }
  }, [showModalDescuentos]);*/

  const abrirCrearDescuento = () => {
    window.location.href = "/crear-descuento"; 
  };

  const handleAplicarDescuento = () => {
    if (selectedDescuentoIndex === null) {
      setError("Selecciona un descuento primero");
      return;
    }
    
    const descuentoSeleccionado = descuentos[selectedDescuentoIndex];
    const nuevosProductos = aplicarDescuento(
      descuentoSeleccionado,
      productosBase,
      subtotal
    );
    
    if (nuevosProductos) {
      setVenta(prev => 
        prev.map(item => {
          const productoActualizado = nuevosProductos.find(p => p.nombre === item.nombre);
          return productoActualizado ? { ...item, ...productoActualizado } : item;
        })
      );
      setShowModalDescuentos(false);
      setSelectedDescuentoIndex(null);
    }
  };
  //const [selectedDescuentoIndex, setSelectedDescuentoIndex] = React.useState(null);
  
  
  const modalDescuentos = (
    <div className={`modal ${showModalDescuentos ? "d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Descuentos existentes</h5>
            <button type="button" className="btn-close" onClick={() => setShowModalDescuentos(false)}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
              {descuentos.map((d, i) => (
                <li
                  key={i}
                  className={`list-group-item ${selectedDescuentoIndex === i ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedDescuentoIndex(i)}
                >
                  {d.nombre} - {(d.valor * 100).toFixed(0)}% (Mínimo Q{d.montoMinimo})
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={abrirCrearDescuento}>
              Crear descuento
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleAplicarDescuento}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark"
            onClick={() => setMostrarRecibo(true)}
          >
            Generar recibo
          </button>
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
              onClick={() => setShowModalDescuentos(true)}
            >
              Aplicar descuento
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
            <button className="btn btn-primary" onClick={() => setShowPagoConfirmacion(true)}>
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
                <button className="btn btn-secondary" onClick={() => setShowPagoConfirmacion(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={() => {
                  setShowPagoConfirmacion(false);
                  setShowPagoView(true);
                }}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de recibo */}
      {mostrarRecibo && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Recibo de compra</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarRecibo(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Gracias por tu compra</strong></p>
                <ul className="list-group mb-2">
                  {venta.map((producto, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{producto.nombre}</strong>
                        <div className="text-muted">
                          {producto.descuento
                            ? <>
                                <span className="text-decoration-line-through">Q{producto.precio.toFixed(2)}</span>
                                {" "}Q{(producto.precio * (1 - producto.descuento)).toFixed(2)}
                              </>
                            : <>Q{producto.precio.toFixed(2)}</>
                          } x {producto.cantidad}
                        </div>
                      </div>
                      <div>
                        <button onClick={() => aumentar(index)}>+</button>
                        <button onClick={() => disminuir(index)}>-</button>
                        <button onClick={() => eliminar(index)}>🗑️</button>
                      </div>
                    </li>
                  ))}

                </ul>
                <p className="text-end">Total: <strong>${subtotal.toFixed(2)}</strong></p>
                {nota && (
                  <p className="mt-3"><em>Nota:</em> {nota}</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarRecibo(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalDescuentos && modalDescuentos}
    </div>
  );
};

export default Venta;