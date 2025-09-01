import React, { useEffect, useState } from "react";
import { getDevices } from "../../APIS/deviceAPI.js";
import { useSocket } from "../../hooks/useSocket.js";
import { useSocketData } from "../../context/SocketDataContext";

const AllDevices = () => {
  const [alive, setAlive] = useState(0); 
  const [disconnected, setDisconnected] = useState(0);
  const [paused, setPaused] = useState(0);
  const socket = useSocket();
  const { deviceStates } = useSocketData();

  useEffect(() => {
    obtenerDevices();

    if (!socket) return;
  }, [socket, deviceStates]);

  const obtenerDevices = async () => {
    try {
      const res = await getDevices();
      const devices = res.data.payload;

      const aliveDevices = devices.filter(
        (device) => device.isAlive === true && device.paused === false
      ).length;

      const pausedDevices = devices.filter(
        (device) => device.paused === true
      ).length;

      const disconnectedDevices = devices.filter(
        (device) => device.isAlive === false
      ).length;

      setAlive(aliveDevices);
      setPaused(pausedDevices);
      setDisconnected(disconnectedDevices);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-4 rounded-xl bg-gray-800 shadow-lg text-white w-full">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-100">
        Estado de dispositivos
      </h2>
      <div className="md:flex justify-between items-center gap-4 grid grid-cols-1">
        <div className="flex-1 bg-green-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{alive}</span>
          <p className="text-md mt-1">Funcionales</p>
        </div>
        <div className="flex-1 bg-gray-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{paused}</span>
          <p className="text-md mt-1">Pausados</p>
        </div>
        <div className="flex-1 bg-red-600 p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-3xl font-bold">{disconnected}</span>
          <p className="text-md mt-1">Caído</p>
        </div>
      </div>
    </section>
  );
};

export default AllDevices;
