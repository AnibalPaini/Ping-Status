import axios from "axios";

const URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/devicesHistory`
  : "http://localhost:8080/api/devicesHistory";

export const getHistorial = async (id) => {
  return await axios.get(`${URL}/${id}`, { withCredentials: true });
};

export const deleteHistorial = async (id) => {
  return await axios.put(`${URL}/${id}`, { withCredentials: true });
};
export const deleteHistorialByIdDevice = async (id) => {
  return await axios.put(`${URL}/${id}/delete`, { withCredentials: true });
};
