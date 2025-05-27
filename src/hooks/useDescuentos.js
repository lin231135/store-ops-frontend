import { useState, useEffect } from 'react';

const useDescuentos = () => {
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoAplicado, setDescuentoAplicado] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDescuentos = () => {
      const descuentosGuardados = JSON.parse(localStorage.getItem("descuentos")) || [];
      setDescuentos(descuentosGuardados);
    };
    cargarDescuentos();
  }, []);

  const aplicarDescuento = (descuentoSeleccionado, productos, subtotal) => {
  if (!descuentoSeleccionado) {
    setError("Debes seleccionar un descuento primero");
    return false;
  }

  if (subtotal < descuentoSeleccionado.montoMinimo) {
    setError(`El subtotal debe ser mayor a Q${descuentoSeleccionado.montoMinimo.toFixed(2)} para aplicar este descuento`);
    return false;
  }

  const productosConDescuento = productos.map(producto => ({
    ...producto,
    descuento: descuentoSeleccionado.valor
  }));

  setDescuentoAplicado(descuentoSeleccionado);
  setError("");
  return productosConDescuento;
};


  return {
    descuentos,
    descuentoAplicado,
    error,
    aplicarDescuento,
    setError
  };
};

export default useDescuentos;