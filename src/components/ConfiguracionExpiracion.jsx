import { Calendar, Eye, EyeOff, BarChart3 } from 'lucide-react';

function ConfiguracionExpiracion({
    diasAlerta,
    setDiasAlerta,
    mostrarVencidos,
    setMostrarVencidos,
    estadisticas
}) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0 d-flex align-items-center">
                    <Calendar className="me-2" size={18} />
                    Configuración de Expiración
                </h6>
            </div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <label className="form-label fw-medium">Días de Alerta</label>
                        <input
                            type="number"
                            className="form-control"
                            value={diasAlerta}
                            onChange={(e) => setDiasAlerta(parseInt(e.target.value) || 1)}
                            min="1"
                            max="30"
                        />
                        <small className="text-muted">Alertar cuando falten X días</small>
                    </div>

                    <div className="col-md-3">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="vencidosSwitch"
                                checked={mostrarVencidos}
                                onChange={(e) => setMostrarVencidos(e.target.checked)}
                            />
                            <label className="form-check-label d-flex align-items-center" htmlFor="vencidosSwitch">
                                {mostrarVencidos ? <Eye size={16} className="me-1" /> : <EyeOff size={16} className="me-1" />}
                                Mostrar Vencidos
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex align-items-center">
                            <BarChart3 size={16} className="me-2 text-muted" />
                            <div className="d-flex gap-2 flex-wrap">
                                <span className="badge bg-success">
                                    Frescos: {estadisticas.fresh || 0}
                                </span>
                                <span className="badge bg-warning">
                                    Por vencer: {(estadisticas['expires-soon'] || 0) + (estadisticas['expires-today'] || 0)}
                                </span>
                                <span className="badge bg-danger">
                                    Vencidos: {estadisticas.expired || 0}
                                </span>
                                <span className="badge bg-secondary">
                                    Sin fecha: {estadisticas.sinFecha || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracionExpiracion;