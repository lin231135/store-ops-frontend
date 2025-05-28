import { Settings, Bell, BellOff } from 'lucide-react';

function ConfiguracionStock({
    stockMinimo,
    setStockMinimo,
    mostrarAlertas,
    setMostrarAlertas,
    estadisticas
}) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0 d-flex align-items-center">
                    <Settings className="me-2" size={18} />
                    Configuración de Stock
                </h6>
            </div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Stock Mínimo</label>
                        <input
                            type="number"
                            className="form-control"
                            value={stockMinimo}
                            onChange={(e) => setStockMinimo(parseInt(e.target.value) || 1)}
                            min="1"
                            max="100"
                        />
                    </div>

                    <div className="col-md-4">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="alertasSwitch"
                                checked={mostrarAlertas}
                                onChange={(e) => setMostrarAlertas(e.target.checked)}
                            />
                            <label className="form-check-label d-flex align-items-center" htmlFor="alertasSwitch">
                                {mostrarAlertas ? <Bell size={16} className="me-1" /> : <BellOff size={16} className="me-1" />}
                                Mostrar Alertas
                            </label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="d-flex gap-2 flex-wrap">
                            <span className="badge bg-success">
                                Normal: {estadisticas['stock-normal'] || 0}
                            </span>
                            <span className="badge bg-warning">
                                Bajo: {estadisticas['stock-bajo'] || 0}
                            </span>
                            <span className="badge bg-danger">
                                Sin Stock: {estadisticas['sin-stock'] || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracionStock;