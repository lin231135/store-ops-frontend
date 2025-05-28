import { useState, useMemo } from 'react';
import { dateUtils } from '../utils/dateUtils';

export function useExpiration(products) {
    const [diasAlerta, setDiasAlerta] = useState(7);
    const [mostrarVencidos, setMostrarVencidos] = useState(true);

    const estadisticasExpiracion = useMemo(() => {
        return products.reduce((acc, product) => {
            if (!product.expirationDate) {
                acc.sinFecha = (acc.sinFecha || 0) + 1;
                return acc;
            }

            const status = dateUtils.getExpirationStatus(product.expirationDate, diasAlerta);
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
    }, [products, diasAlerta]);

    const productosVencidos = useMemo(() => {
        return products.filter(product =>
            product.expirationDate &&
            dateUtils.getExpirationStatus(product.expirationDate, diasAlerta) === 'expired'
        );
    }, [products, diasAlerta]);

    const productosPorVencer = useMemo(() => {
        return products.filter(product => {
            if (!product.expirationDate) return false;
            const status = dateUtils.getExpirationStatus(product.expirationDate, diasAlerta);
            return status === 'expires-soon' || status === 'expires-today';
        });
    }, [products, diasAlerta]);

    const productosOrdenadosPorExpiracion = useMemo(() => {
        return [...products].sort((a, b) => {
            if (!a.expirationDate && !b.expirationDate) return 0;
            if (!a.expirationDate) return 1;
            if (!b.expirationDate) return -1;
            return new Date(a.expirationDate) - new Date(b.expirationDate);
        });
    }, [products]);

    return {
        diasAlerta,
        setDiasAlerta,
        mostrarVencidos,
        setMostrarVencidos,
        estadisticasExpiracion,
        productosVencidos,
        productosPorVencer,
        productosOrdenadosPorExpiracion
    };
}