import { useState } from 'react';

export function useStockConfig() {
    const [stockMinimo, setStockMinimo] = useState(30);
    const [mostrarAlertas, setMostrarAlertas] = useState(true);

    const getStockStatus = (quantity) => {
        if (quantity === 0) return 'sin-stock';
        if (quantity <= stockMinimo) return 'stock-bajo';
        return 'stock-normal';
    };

    const getStockBadgeClass = (quantity) => {
        const status = getStockStatus(quantity);
        switch (status) {
            case 'sin-stock': return 'bg-danger';
            case 'stock-bajo': return 'bg-warning';
            default: return 'bg-success';
        }
    };

    const contarProductosPorEstado = (products) => {
        return products.reduce((acc, product) => {
            const status = getStockStatus(product.quantity);
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
    };

    return {
        stockMinimo,
        setStockMinimo,
        mostrarAlertas,
        setMostrarAlertas,
        getStockStatus,
        getStockBadgeClass,
        contarProductosPorEstado
    };
}