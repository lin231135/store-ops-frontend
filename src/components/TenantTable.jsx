import React from 'react';
import { useTenant } from '../context/TenantContext';

// Componente que renderiza la tabla con los datos de los tenants
const TenantTable = () => {
  const { tenants } = useTenant(); // Obtenemos los datos del contexto

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>
          {tenants.length === 0 ? (
            // Si no hay datos, mostramos mensaje de carga
            <tr><td colSpan="5" className="text-center">Cargando datos...</td></tr>
          ) : (
            // Si hay datos, los mapeamos en la tabla
            tenants.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>
                  {item.estado
                    ? <span className="badge bg-success">Activo</span>
                    : <span className="badge bg-secondary">Inactivo</span>}
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>{new Date(item.updated_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenantTable;
