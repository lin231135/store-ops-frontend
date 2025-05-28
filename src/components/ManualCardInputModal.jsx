const ManualCardInputModal = ({ show, onClose }) => {
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
                        <h5 className="modal-title">Ingreso manual de tarjeta</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nombre en la tarjeta</label>
                                <input type="text" className="form-control" placeholder="Ej: Juan Pérez" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número de tarjeta</label>
                                <input type="text" className="form-control" placeholder="XXXX XXXX XXXX XXXX" />
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Expiración</label>
                                    <input type="text" className="form-control" placeholder="MM/AA" />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">CVV</label>
                                    <input type="text" className="form-control" placeholder="123" />
                                </div>
                            </div>
                            <div className="text-end">
                                <button type="button" className="btn btn-primary" onClick={onClose}>
                                    Guardar tarjeta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualCardInputModal;