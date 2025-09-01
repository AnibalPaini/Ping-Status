import React, { useState, useEffect, useRef } from "react";
import IconPerson from "./UI/Icons/IconPerson";
import IconRowBot from "./UI/Icons/IconRowBot";
import { logout } from "../APIS/usersAPI";
import { useAuth } from "../context/AuthContext";
import Confirm from "./UI/Alerts/Confirm";

const Header = ({ setSelectedDevice, setPagina }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const { setUsuario, usuario } = useAuth();
  const [modalConfirm, setModalConfirm] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex bg-gray-900 py-4 px-6 justify-between items-center relative">
      <div>
        <img
          src="/img/PingStatus-blanco.png"
          alt="Ping Status Logo"
          className="w-40 cursor-pointer"
          onClick={() => {
            setPagina("all");
            setSelectedDevice(null);
          }}
        />
      </div>

      <div ref={menuRef}>
        <div
          className="flex items-center space-x-0.5 bg-gray-700 p-1 rounded-full hover:bg-black transition cursor-pointer"
          onClick={() => toggleMenu()}
          ref={menuRef}
        >
          <IconPerson />
          <IconRowBot />
        </div>

        {/* Dropdown */}
        {menu && (
          <div className="absolute right-6 top-16 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
              onClick={() => setPagina("perfil")}
            >
              Perfil
            </button>
            {usuario?.rol !== "visor" &&
              (usuario&& (
                <button
                  className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                  onClick={() => setPagina("config")}
                >
                  Ajustes
                </button>
              ))}

            <button
              className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
              onClick={async () => {
                setModalConfirm(true);
              }}
            >
              Salir
            </button>
          </div>
        )}
      </div>
      {modalConfirm && (
        <Confirm
          texto={`¿Estás seguro de que deseas cerrar sesión?`}
          onConfirm={async () => {
            await logout();
            setPagina("login");
            setUsuario(null);
            setSelectedDevice(null);
            window.location.reload();
          }}
          onCancel={() => setModalConfirm(false)}
        />
      )}
    </header>
  );
};

export default Header;
