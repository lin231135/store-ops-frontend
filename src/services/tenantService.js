import axios from 'axios';

// Servicio para obtener todos los tenants desde la API
export const getAllTenants = async () => {
  const response = await axios.get('/api/tenants'); // Petición GET al backend
  return response.data; // Devolvemos los datos obtenidos
};
