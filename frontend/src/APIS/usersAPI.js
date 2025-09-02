import axios from "axios";

const URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/users`
  : "http://localhost:8080/users";

export const login = async (datos) => {
  return await axios.post(`${URL}/login`, datos, { withCredentials: true });
};

export const getPerfil = async () => {
  try {
    const res = await axios.get(`${URL}/perfil`, { withCredentials: true });
    return res;
  } catch {
    return null;
  }
};

export const getUsuarios = async () => {
  try {
    return await axios.get(`${URL}/users`, { withCredentials: true });
  } catch {
    return null;
  }
};

export const postUser = async (datos) => {
  return await axios.post(`${URL}/postUser`, datos, {
    withCredentials: true,
  });
};

export const putUser = async (id, datos) => {
  return await axios.put(`${URL}/users/${id}`, datos, {
    withCredentials: true,
  });
};

export const deleteUsuario = async (id) => {
  return await axios.delete(`${URL}/users/${id}`, { withCredentials: true });
};

export const logout = async () => {
  return await axios.post(`${URL}/logout`, {}, { withCredentials: true });
};

export const editPassword = async (id, datos) => {
  return await axios.put(`${URL}/users/${id}/password`, datos, {
    withCredentials: true,
  });
};
