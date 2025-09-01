import axios from "axios";

const URL = "http://localhost:8080/api/devices";

export const getDevices = async () => {
  return await axios.get(`${URL}/`, { withCredentials: true });
};

export const getDevicesById = async (id) => {
  return await axios.get(`${URL}/${id}`, { withCredentials: true });
};

export const postDevices = async (datos) => {
  return await axios.post(`${URL}/`, datos, { withCredentials: true });
};

export const putDevices = async (id, datos) => {
  return await axios.put(`${URL}/${id}`, datos, { withCredentials: true });
};

export const deleteDevices = async (id) => {
  return await axios.delete(`${URL}/${id}`, { withCredentials: true });
};

export const pauseDevice = async (id) => {
  console.log("PAUSA");
  return await axios.put(`${URL}/pause/${id}`, {}, { withCredentials: true });
};
