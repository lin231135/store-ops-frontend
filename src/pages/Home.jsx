import React from 'react';
import TenantTable from '../components/TenantTable';

const Home = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Gestión de Tenants</h2>
      <TenantTable />
    </div>
  );
};

export default Home;
