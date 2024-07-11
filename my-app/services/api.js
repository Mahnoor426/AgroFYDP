// services/api.js
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000';  // Replace with your Flask backend URL

export const predictCropAndYield = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error('Error making prediction request:', error);
    throw error;
  }
};
