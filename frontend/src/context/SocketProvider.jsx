import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext.jsx";

const SERVER_URL = "http://localhost:8080";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Se ejecuta solo una vez cuando el componente se monta, crea la conexión de socket
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
    // La función de limpieza de useEffect se ejecuta cuando el componente se desmonta.
    // Esto es CRUCIAL para cerrar la conexión y evitar conexiones duplicadas.
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
