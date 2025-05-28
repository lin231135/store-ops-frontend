import { useState, useEffect } from "react";

const CashPaymentModal = ({ show, onClose, subtotal }) => {
    const [efectivoRecibido, setEfectivoRecibido] = useState("");
    const [cambio, setCambio] = useState(null);

    useEffect(() => {
        const recibido = parseFloat(efectivoRecibido);
        if (!isNaN(recibido) && recibido >= subtotal) {
            setCambio((recibido - subtotal).toFixed(2));
        } else {
            setCambio(null);
        }
    }, [efectivoRecibido, subtotal]);

    if (!show) return null;

    return (
        <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cobro en efectivo</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Total a pagar: <strong>${subtotal.toFixed(2)}</strong></p>
                        <div className="mb-3">
                            <label className="form-label">Efectivo recibido</label>
                            <input
                                type="number"
                                className="form-control"
                                value={efectivoRecibido}
                                onChange={(e) => setEfectivoRecibido(e.target.value)}
                                placeholder="Ingrese el monto entregado"
                            />
                        </div>
                        {cambio !== null && (
                            <div className="alert alert-success">
                                Cambio a devolver: <strong>${cambio}</strong>
                            </div>
                        )}
                        <div className="text-end">
                            <button
                                className="btn btn-success"
                                disabled={cambio === null}
                                onClick={() => {
                                    alert("Pago en efectivo confirmado");
                                    onClose();
                                }}
                            >
                                Confirmar pago
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashPaymentModal;