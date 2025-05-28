import { useState, useEffect } from 'react';
import { AlertTriangle, Package, TrendingDown } from 'lucide-react';

function AlertasStock({ products, stockMinimo = 30 }) {
    const [showAlert, setShowAlert] = useState(true);
    const [alertsData, setAlertsData] = useState({
        agotandose: [],
        sinStock: [],
        total: 0
    });

    useEffect(() => {
        const agotandose = products.filter(p => p.quantity > 0 && p.quantity <= stockMinimo);
        const sinStock = products.filter(p => p.quantity === 0);

        setAlertsData({
            agotandose,
            sinStock,
            total: agotandose.length + sinStock.length
        });
    }, [products, stockMinimo]);

    if (alertsData.total === 0 || !showAlert) return null;

    return (
        <div className="alert alert-warning alert-dismissible shadow-sm border-0 mb-4" role="alert">
            <div className="d-flex align-items-start">
                <AlertTriangle className="text-warning me-2 mt-1" size={20} />
                <div className="flex-grow-1">
                    <h6 className="alert-heading mb-2 fw-bold d-flex align-items-center">
                        <Package className="me-2" size={18} />
                        Alertas de Inventario ({alertsData.total})
                    </h6>

                    {alertsData.sinStock.length > 0 && (
                        <div className="mb-2">
                            <small className="text-danger fw-bold d-flex align-items-center mb-1">
                                <TrendingDown size={14} className="me-1" />
                                Sin Stock ({alertsData.sinStock.length}):
                            </small>
                            <div className="d-flex flex-wrap gap-1">
                                {alertsData.sinStock.map(product => (
                                    <span key={product.id} className="badge bg-danger text-white">
                                        {product.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {alertsData.agotandose.length > 0 && (
                        <div>
                            <small className="text-warning fw-bold d-flex align-items-center mb-1">
                                <AlertTriangle size={14} className="me-1" />
                                Stock Bajo ({alertsData.agotandose.length}):
                            </small>
                            <div className="d-flex flex-wrap gap-1">
                                {alertsData.agotandose.map(product => (
                                    <span key={product.id} className="badge bg-warning text-dark">
                                        {product.name} ({product.quantity})
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

export default AlertasStock;