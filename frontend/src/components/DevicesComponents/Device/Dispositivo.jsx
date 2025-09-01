import React, { useEffect, useState } from "react";
import { getDeviceStats, getLastsPings } from "../../../APIS/deviceStatsAPI.js";
import { useSocket } from "../../../hooks/useSocket.js";
import { useSocketData } from "../../../context/SocketDataContext.jsx";
import PingsDevice from "./PingsDevice.jsx";
import TagsDevice from "./TagsDevice.jsx";

const Dispositivo = ({ device, setActualizar, actualizar }) => {
  const [stats, setStats] = useState();
  const [isAlive, setIsAlive] = useState(device.isAlive);
  const [lastsPings, setLastsPings] = useState([]);
  const [loadingPings, setLoadingPings] = useState(true);
  const [numPings, setNumPings] = useState(20);

  const socket = useSocket();
  const { deviceStats, deviceStates, devicePings } = useSocketData();

  useEffect(() => {
    const obtenerStats = async () => {
      try {
        const [statsRes, lastPingsRes] = await Promise.all([
          getDeviceStats(device._id),
          getLastsPings(device._id),
        ]);
        setStats(statsRes.data.payload);
        setLastsPings(lastPingsRes.data.payload);
        setLoadingPings(false);
      } catch (error) {
        console.log(error);
      } finally {
        if (setActualizar) setActualizar(false);
      }
    };

    obtenerStats();
  }, [actualizar, device._id]);

  useEffect(() => {
    const calcularPings = () => {
      const width = window.innerWidth;
      if (width >= 1600) setNumPings(20);
      else if (width >= 1000) setNumPings(15);
      else if (width >= 480) setNumPings(20);
      else if (width >= 300) setNumPings(10);
      else setNumPings(5);
    };

    calcularPings();
    window.addEventListener("resize", calcularPings);

    return () => window.removeEventListener("resize", calcularPings);
  }, []);

  const pingsToShow = stats?.paused
    ? Array.from({ length: numPings }, () => ({ status: "PAUSED" }))
    : loadingPings
    ? Array.from({ length: numPings }, () => ({ status: "LOADING" }))
    : (lastsPings || []).slice(-numPings);

  useEffect(() => {
    if (!socket) return;
    const newStats = deviceStats[device._id];
    if (newStats) {
      setStats((prevStats) => {
        if (
          prevStats?.promedio === newStats.promedio &&
          prevStats?.paused === (prevStats?.paused ?? false)
        )
          return prevStats;
        return { ...newStats, paused: prevStats?.paused ?? false };
      });
    }
    const newState = deviceStates[device._id] ?? device.isAlive;
    if (newState !== isAlive) setIsAlive(newState);

    const nuevosPings = devicePings[device._id];
    if (nuevosPings?.length) {
      setLastsPings(nuevosPings);
      setLoadingPings(false);
    }
  }, [socket, device._id, deviceStats, deviceStates, devicePings]);

  return (
    <>
      <div>
        <div className="flex">
          <div className="flex items-center gap-x-2">
            <span
              className={`rounded-xl w-16 text-center px-2 py-1 font-medium ${
                stats?.paused
                  ? "bg-gray-400 text-black"
                  : isAlive
                  ? "bg-green-400 text-black"
                  : "bg-red-400 text-black"
              }`}
            >
              {stats?.promedio ?? "..."}%
            </span>

            <div className="flex items-center space-x-2">
              <p className="text-lg text-gray-200">{device.name}</p>
              <p className="text-lg text-gray-200 hidden 2xl:block">
                {device.ip}
              </p>
            </div>
          </div>
        </div>
        {device.tag && <TagsDevice device={device} />}
      </div>

      <PingsDevice pings={pingsToShow} />
    </>
  );
};

export default Dispositivo;
