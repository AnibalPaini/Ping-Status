import React, { useState } from "react";
import EtiquetasConfig from "./EtiquetasConfig";
import UsuariosConfig from "./Users/UsuariosConfig";
import HistorialConfig from "./Historial/HistorialConfig";

const Config = () => {
  const [selected, setSelected] = useState("etiquetas");

  const renderContent = () => {
    switch (selected) {
      case "etiquetas":
        return <EtiquetasConfig />;
      case "usuarios":
        return <UsuariosConfig />;
      case "historial":
        return <HistorialConfig />;
      default:
        return <div className="p-4">Selecciona una opción</div>;
    }
  };

  return (
    <section className="w-full">
      <h2 className="text-gray-400 font-semibold text-3xl mb-2">Ajustes</h2>

      <div className="grid grid-cols-3 gap-x-2 rounded-xl bg-gray-800 shadow-lg p-4">
        {/* Sidebar */}
        <div className="w-full border-r border-gray-700">
          <div
            className={`h-15 cursor-pointer rounded-md flex items-center ${
              selected === "etiquetas"
                ? "bg-gray-700 text-gray-300"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelected("etiquetas")}
          >
            {selected === "etiquetas" && (
              <span className="w-1 h-full bg-green-400 mr-2 p-0"></span>
            )}
            <span className="ml-2">Etiquetas</span>
          </div>
          <div
            className={`h-15 cursor-pointer rounded-md flex items-center ${
              selected === "usuarios"
                ? "bg-gray-700 text-gray-300"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelected("usuarios")}
          >
            {selected === "usuarios" && (
              <span className="w-1 h-full bg-green-400 mr-2 p-0"></span>
            )}
            <span className="ml-2">Usuarios</span>
          </div>

          <div
            className={`h-15 cursor-pointer rounded-md flex items-center ${
              selected === "historial"
                ? "bg-gray-700 text-gray-300"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelected("historial")}
          >
            {selected === "historial" && (
              <span className="w-1 h-full bg-green-400 mr-2 p-0"></span>
            )}
            <span className="ml-2">Historial</span>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-2 w-full rounded-lg shadow-inner ">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Config;
