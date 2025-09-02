import axios from "axios";

const URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/tags`
  : "http://localhost:8080/api/tags";

export const getTags = async () => {
  return await axios.get(`${URL}/`, { withCredentials: true });
};

export const getTagById = async (id) => {
  return await axios.get(`${URL}/${id}`, { withCredentials: true });
};

export const postTag = async (datos) => {
  return await axios.post(`${URL}/`, datos, { withCredentials: true });
};

export const deleteTag = async (id) => {
  return await axios.delete(`${URL}/${id}`, id, { withCredentials: true });
};
