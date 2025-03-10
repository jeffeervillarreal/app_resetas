// api.js
import axios from 'axios';

const API_KEY = '9690e1ac8524488d96e570575f6f1248'; // Reemplaza con tu API Key de Spoonacular
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const buscarRecetas = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
        number: 10, // Número de recetas a obtener
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error buscando recetas:', error);
    return [];
  }
};

export const obtenerDetallesReceta = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo detalles de la receta:', error);
    return null;
  }
};
