import axios from "axios";

const URL = "http://localhost:8080/api/devicesStats";

export const getDeviceStats = async (id) => {
  return await axios.get(`${URL}/${id}`, { withCredentials: true });
};

export const getPromediosDevices = async (id) => {
  return await axios.get(`${URL}/${id}/promedios`, { withCredentials: true });
};

export const getLastsPings = async (id) => {
  return await axios.get(`${URL}/pings/${id}`, { withCredentials: true });
};
