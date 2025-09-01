import React, { useState } from "react";
import ButtonCreate from "../../UI/Buttons/ButtonCreate.jsx";
import ModalesUsuarios from "./ModalesUsuarios.jsx";
import TableUsers from "./TableUsers.jsx";
import { useEffect } from "react";
import { getUsuarios, postUser } from "../../../APIS/usersAPI.js";
import { handleApiError } from "../../../utils/handlerApiError.js";
import { useAutoClearMessages } from "../../../hooks/useAutoClearMessages.jsx";
import { SuccesAlert, ErrorAlert } from "../../UI/Alerts/Alerts.jsx";

const UsuariosConfig = () => {
  const [modal, setModal] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [update, setUpdate] = useState(false);

  // Mensajes de éxito y error
  const [messageSucces, setMessageSucces] = useState("");
  const [messageError, setMessageError] = useState("");

  useAutoClearMessages(
    messageSucces,
    setMessageSucces,
    messageError,
    setMessageError
  );

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const res = await getUsuarios();
      setListaUsuarios(res.data.payload);
    };
    obtenerUsuarios();
  }, [update]);

  return (
    <div>
      <p className="text-gray-400 font-semibold text-xl mb-2">Usuarios</p>
  {messageSucces && <SuccesAlert texto={messageSucces} />}
  {messageError && <ErrorAlert texto={messageError} />}
      <div className="space-y-2">
        <div
          className="w-fit mt-2 mb-5"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <ButtonCreate texto="Crear usuario" />
        </div>
        <div className="overflow-x-auto">
          <TableUsers listaUsuarios={listaUsuarios} setUpdate={setUpdate} />
        </div>
      </div>
      {modal && (
        <ModalesUsuarios
          setModal={setModal}
          mode="create"
          onSubmit={async (data) => {
            try {
              await postUser(data);
              setUpdate((prev) => !prev);
              setModal(false);
              setMessageSucces("Usuario creado correctamente");
            } catch (error) {
              handleApiError(
                error,
                setMessageError,
                "Error al crear el usuario"
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default UsuariosConfig;
