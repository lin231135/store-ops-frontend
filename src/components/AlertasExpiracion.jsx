import { useState } from 'react';
import { Clock, AlertTriangle, X, Calendar } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

function AlertasExpiracion({ productosVencidos, productosPorVencer, diasAlerta }) {
    const [showAlert, setShowAlert] = useState(true);

    const totalAlertas = productosVencidos.length + productosPorVencer.length;

    if (totalAlertas === 0 || !showAlert) return null;

    return (
        <div className="alert alert-danger alert-dismissible shadow-sm border-0 mb-4" role="alert">
            <div className="d-flex align-items-start">
                <Clock className="text-danger me-2 mt-1" size={20} />
                <div className="flex-grow-1">
                    <h6 className="alert-heading mb-2 fw-bold d-flex align-items-center">
                        <Calendar className="me-2" size={18} />
                        Alertas de Expiración ({totalAlertas})
                    </h6>

                    {productosVencidos.length > 0 && (
                        <div className="mb-2">
                            <small className="text-danger fw-bold d-flex align-items-center mb-1">
                                <X size={14} className="me-1" />
                                Productos Vencidos ({productosVencidos.length}):
                            </small>
                            <div className="d-flex flex-wrap gap-1">
                                {productosVencidos.map(product => (
                                    <span key={product.id} className="badge bg-danger text-white">
                                        {product.name} - {dateUtils.formatDate(product.expirationDate)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {productosPorVencer.length > 0 && (
                        <div>
                            <small className="text-warning fw-bold d-flex align-items-center mb-1">
                                <AlertTriangle size={14} className="me-1" />
                                Por Vencer (próximos {diasAlerta} días):
                            </small>
                            <div className="d-flex flex-wrap gap-1">
                                {productosPorVencer.map(product => (
                                    <span key={product.id} className="badge bg-warning text-dark">
                                        {product.name} - {dateUtils.getExpirationText(product.expirationDate, diasAlerta)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAlert(false)}
                    aria-label="Cerrar alerta"
                ></button>
            </div>
        </div>
    );
}

export default AlertasExpiracion;