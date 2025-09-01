import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    // Esto puede pasar brevemente mientras se establece la conexión inicial
    console.log("Socket.IO no está conectado todavía.");
  }
  return socket;
};
