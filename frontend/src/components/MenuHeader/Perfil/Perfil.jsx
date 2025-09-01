import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { editPassword } from "../../../APIS/usersAPI";
import ModalesUsuarios from "../Users/ModalesUsuarios";

const Perfil = () => {
  const { usuario, cargando } = useAuth();
  const [modal, setModal] = useState(false);

  if (cargando) return <p className="text-gray-400">Cargando perfil...</p>;

  return (
    <section className="w-full">
      <h2 className="text-gray-400 font-semibold text-3xl mb-4">Perfil</h2>
      <div className="rounded-xl bg-gray-800 shadow-lg p-6 flex flex-col items-center space-y-4 ">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-3xl text-gray-50 font-bold">
          {usuario?.user?.charAt(0).toUpperCase()}
        </div>

        {/* Información del usuario */}
        <div className="w-full text-center space-y-1">
          <p className="text-gray-300 text-lg">
            <span className="font-semibold">Usuario:</span> {usuario?.user}
          </p>
          <p className="text-gray-300 text-lg">
            <span className="font-semibold">Rol:</span> {usuario?.rol}
          </p>
        </div>

        {/* Botón opcional */}
        <button
          className="mt-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
          onClick={() => setModal(!modal)}
        >
          Cambiar clave
        </button>
      </div>
      {modal && (
        <ModalesUsuarios
          setModal={setModal}
          mode={"perfil"}
          onSubmit={async (data) => {
            await editPassword(usuario.id, data);
            setModal(false);
          }}
        />
      )}
    </section>
  );
};

export default Perfil;
