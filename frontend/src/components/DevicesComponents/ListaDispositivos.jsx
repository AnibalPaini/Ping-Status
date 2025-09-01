import React, { useEffect, useState } from "react";
import Dispositivo from "./Device/Dispositivo.jsx";
import { getDevices } from "../../APIS/deviceAPI.js";
import HeaderListaDispositivos from "./HeaderListaDispositivos.jsx";
import { useSocket } from "../../hooks/useSocket.js";
import { useSocketData } from "../../context/SocketDataContext";

const ListaDispositivos = ({
  onSelectDevice,
  setPagina,
  actualizar,
  setActualizar,
}) => {
  const [listaDevices, setListaDevices] = useState([]);
  const [filtros, setFiltros] = useState({ filtroEstado: {}, filtroTag: [] });
  const [busqueda, setBusqueda] = useState("");
  const socket = useSocket();
  const { deviceStates } = useSocketData();

  useEffect(() => {
    obtenerDevices();
  }, [actualizar]);

  useEffect(() => {
    if(!socket) return;
    if (!deviceStates) return;

    setListaDevices((prevDevices) =>
      prevDevices.map((device) => {
        const newIsAlive = deviceStates[device._id];
        if (typeof newIsAlive === "boolean") {
          return { ...device, isAlive: newIsAlive };
        }
        return device;
      })
    );
  }, [deviceStates, socket]);

  const obtenerDevices = async () => {
    try {
      const res = await getDevices();
      setListaDevices(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const dispositivosFiltrados = listaDevices.filter((device) => {
    // Filtrar por estado
    if (filtros.filtroEstado && Object.keys(filtros.filtroEstado).length > 0) {
      const estadoFiltro = filtros.filtroEstado.value;

      if (estadoFiltro === "funcional" && !device.isAlive) return false;
      if (estadoFiltro === "caidos" && device.isAlive) return false;
      if (estadoFiltro === "pausados" && !device.paused) return false;
      if (estadoFiltro === "desconectados" && device.isConnected) return false;
    }

    // Filtrar por tags
    if (filtros.filtroTag && filtros.filtroTag.length > 0) {
      const tagIds = filtros.filtroTag.map((tag) => tag);
      const deviceTagIds = device.tag.map((tag) => tag._id);

      // Si el dispositivo no tiene tag o no está en los tags seleccionados, lo excluye
      const cumpleTodos = tagIds.every((id) => deviceTagIds.includes(id));

      if (!cumpleTodos) return false;
    }

    //filtrar por nombre
    if (busqueda && busqueda.trim() !== "") {
      const busquedaFormat = busqueda.toLowerCase();
      if (!device.name.toLowerCase().includes(busquedaFormat)) return false;
    }

    return true;
  });

  return (
    <section className="p-5">
      <HeaderListaDispositivos
        setFiltros={setFiltros}
        setBusqueda={setBusqueda}
        setPagina={setPagina}
        onSelectDevice={onSelectDevice}
      />
      <div className=" bg-gray-800 w-full px-2 py-4 overflow-y-auto max-h-[550px] xl:max-h-[650px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {dispositivosFiltrados.length !== 0 ? (
          dispositivosFiltrados.map((device) => (
            <div
              onClick={() => {
                onSelectDevice(device);
                setPagina("info");
              }}
              className={`flex px-2 py-4 justify-between items-center cursor-pointer hover:bg-gray-600 w-full ${
                (!device.isConnected && "opacity-50") ||
                (device.paused && "opacity-80")
              }`}
              key={device._id}
            >
              <Dispositivo
                key={device._id}
                device={device}
                actualizar={actualizar}
                setActualizar={setActualizar}
                setPagina={setPagina}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-100">
            No hay dispositivos que coincidan con el filtro.
          </p>
        )}
      </div>
    </section>
  );
};

export default ListaDispositivos;
