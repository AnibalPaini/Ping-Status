import { createContext, useContext, useState, useEffect } from "react";
import { getPerfil } from "../APIS/usersAPI.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await getPerfil();
        setUsuario(res.data.payload);
      } catch {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
