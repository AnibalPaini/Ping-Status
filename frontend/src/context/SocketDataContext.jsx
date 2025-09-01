// context/SocketDataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext.jsx";

const SocketDataContext = createContext();

export const SocketDataProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const [deviceStats, setDeviceStats] = useState({});
  const [deviceStates, setDeviceStates] = useState({});
  const [devicePings, setDevicePings] = useState({});
  const [deviceMs, setDeviceMs] = useState({});

  useEffect(() => {
    if (!socket) return;

    const handleStats = (data) => {
      setDeviceStats((prev) => ({ ...prev, [data.deviceId]: data }));
      setDeviceMs((prev)=>({...prev,[data.deviceId]:data.ms}))
    };

    const handleDevice = (data) => {
      setDeviceStates((prev) => ({ ...prev, [data.deviceId]: data.isAlive }));
    };

    const handlePings = (data) => {
      setDevicePings((prev) => ({ ...prev, [data.deviceId]: data.lastsPings }));
    };

    socket.on("stats:update", handleStats);
    socket.on("device:update", handleDevice);
    socket.on("pings:update", handlePings);

    return () => {
      socket.off("stats:update", handleStats);
      socket.off("device:update", handleDevice);
      socket.off("pings:update", handlePings);
    };
  }, [socket]);

  return (
    <SocketDataContext.Provider value={{ deviceStats, deviceStates, devicePings, deviceMs }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export const useSocketData = () => useContext(SocketDataContext);
