import React, { useState, useEffect } from "react";
import {
  getDeviceStats,
  getPromediosDevices,
} from "../../../APIS/deviceStatsAPI.js";
import { getHistorial } from "../../../APIS/deviceHistoryAPI.js";
import { pauseDevice, deleteDevices } from "../../../APIS/deviceAPI.js";
import { useSocket } from "../../../hooks/useSocket.js";
import { useSocketData } from "../../../context/SocketDataContext.jsx";
import { deleteHistorial } from "../../../APIS/deviceHistoryAPI.js";
import { TrashIconRed } from "../../UI/Icons/TrashIcon.jsx";
import HeaderInfo from "./HeaderInfo.jsx";
import StatsInfo from "./StatsInfo.jsx";
import HistoryInfo from "./HistoryInfo.jsx";
import Confirm from "../../UI/Alerts/Confirm.jsx";
import { SuccesAlert, ErrorAlert } from "../../UI/Alerts/Alerts.jsx";
import { useAutoClearMessages } from "../../../hooks/useAutoClearMessages.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { handleApiError } from "../../../utils/handlerApiError.js";

const DeviceInfo = ({ device, setActualizar, setUpdateDevice, setPagina }) => {
  const [, setStats] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [ms, setMs] = useState(0);
  const [, setIsAlive] = useState(device.isAlive);
  const [, setLastsPings] = useState([]);
  const [promedio, setPromedio] = useState({});
  const socket = useSocket();
  const { deviceStats, deviceStates, devicePings, deviceMs } = useSocketData();
  const [mostrarConfirm, setMostrarConfirm] = useState(false);
  const [messageSucces, setMessageSucces] = useState("");
  const [messageError, setMessageError] = useState("");
  const { usuario } = useAuth();

  useAutoClearMessages(
    messageSucces,
    setMessageSucces,
    messageError,
    setMessageError
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historialRes, promediosRes] = await Promise.all([
          getDeviceStats(device._id),
          getHistorial(device._id),
          getPromediosDevices(device._id),
        ]);
        setStats(statsRes.data.payload);
        setMs(statsRes.data.payload.ms);
        setHistorial(historialRes.data.payload);
        setPromedio(promediosRes.data.payload);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [device._id]);

  useEffect(() => {
    if (!socket) return;
    setStats(deviceStats[device._id]);
    setIsAlive(deviceStates[device._id]);
    setLastsPings(devicePings[device._id]);
    setMs(deviceMs[device._id]);
  }, [socket, deviceStats, deviceStates, devicePings, deviceMs, device._id]);

  const handlerPauseDevice = async () => {
    try {
      await pauseDevice(device._id);
      setActualizar(true);
    } catch (error) { 
      handleApiError(error, setMessageError, "Error al pausar dispositivo");
    }
  };

  const handlerDeleteDevice = async () => {
    try {
      await deleteDevices(device._id);
      setActualizar(true);
      setPagina("all");
    } catch (error) {
      handleApiError(error, setMessageError, "Error al eliminar dispositivo");
    }
  };

  const handlerDeleteHistory = async () => {
    try {
      await deleteHistorial(historial[0]._id);
      const res = await getHistorial(device._id);
      setHistorial(res.data.payload);
      setMessageSucces("Historial eliminado");
    } catch (error) {
      handleApiError(error, setMessageError, "Error al eliminar historial");
    }
  };

  return (
    <div>
      {usuario.rol !== "visor" && (
        <HeaderInfo
          setPagina={setPagina}
          device={device}
          setUpdateDevice={setUpdateDevice}
          handlerDeleteDevice={handlerDeleteDevice}
          handlerPauseDevice={handlerPauseDevice}
        />
      )}

      <StatsInfo ms={ms} promedio={promedio} />
      <div className="bg-gray-800 mt-5 rounded-2xl p-10 flex flex-col">
        <div className="flex justify-end mb-2 mr-2">
          {usuario.rol !== "visor" && (
            <div onClick={() => setMostrarConfirm(true)}>
              <TrashIconRed className={"w-8 h-8"} />
            </div>
          )}
        </div>
        <div className="overflow-auto max-h-86 w-full overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          <HistoryInfo historial={historial} />
        </div>
      </div>
      {mostrarConfirm && (
        <Confirm
          texto={"Esta seguro que quiere eliminar el historial?"}
          onConfirm={() => {
            handlerDeleteHistory(), setMostrarConfirm(false);
          }}
          onCancel={() => setMostrarConfirm(false)}
        />
      )}
      {messageSucces && <SuccesAlert texto={messageSucces} />}
      {messageError && <ErrorAlert texto={messageError} />}
    </div>
  );
};

export default DeviceInfo;
