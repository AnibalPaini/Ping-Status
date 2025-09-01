import React, { useState } from "react";
import { TrashIconRed } from "../../UI/Icons/TrashIcon.jsx";
import { EditPenIcon } from "../../UI/Icons/EditIcon.jsx";
import { putUser, deleteUsuario } from "../../../APIS/usersAPI.js";
import ModalesUsuarios from "./ModalesUsuarios.jsx";
import Confirm from "../../UI/Alerts/Confirm.jsx";
import { SuccesAlert, ErrorAlert } from "../../UI/Alerts/Alerts.jsx";
import { handleApiError } from "../../../utils/handlerApiError.js";
import { useAutoClearMessages } from "../../../hooks/useAutoClearMessages.jsx";

const TableUsers = ({ listaUsuarios, setUpdate }) => {
  const [modal, setModal] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  useAutoClearMessages(
    messageSuccess,
    setMessageSuccess,
    messageError,
    setMessageError
  );

  const handleDelete = async (userSeleccionado) => {
    try {
      await deleteUsuario(userSeleccionado._id);
      setUpdate((prev) => !prev);
      setMessageSuccess("Usuario eliminado");
      setModalConfirm(false);
    } catch (error) {
      console.log(error);

      handleApiError(error, setMessageError, "Error al eliminar el usuario");
    }
  };
  const handleUpdate = async (data) => {
    try {
      await putUser(userSeleccionado._id, data);
      setMessageSuccess("Usuario actualizado");
      setUpdate((prev) => !prev);
      setModal(false);
    } catch (error) {
      console.log(error);
      handleApiError(error, setMessageError, "Error al actualizar el usuario");
    }
  };

  return (
    <>
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
              Editar
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600 bg-gray">
          {listaUsuarios.map((user) => (
            <tr className="hover:bg-gray-700 transition-colors" key={user._id}>
              <td className="px-6 py-4 text-sm text-gray-200">{user.user}</td>
              <td className="px-6 py-4 text-sm text-gray-200">
                {user.rol.toUpperCase()}
              </td>
              <td className="px-6 py-4">
                <button
                  className="flex justify-center items-center w-full text-blue-500 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setModal(!modal);
                    setUserSeleccionado(user);
                  }}
                >
                  <EditPenIcon className="w-8 h-8" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="flex justify-center items-center w-full text-red-500 hover:text-red-400 transition-colors"
                  onClick={() => {
                    setModalConfirm(true);
                    setUserSeleccionado(user);
                  }}
                >
                  <TrashIconRed className="w-8 h-8" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <ModalesUsuarios
          setModal={setModal}
          mode="update"
          defaultValues={userSeleccionado}
          onSubmit={handleUpdate}
        />
      )}
      {modalConfirm && (
        <Confirm
          onCancel={() => setModalConfirm(false)}
          onConfirm={() => handleDelete(userSeleccionado)}
          texto={"¿Estás seguro de eliminar este usuario?"}
        />
      )}
      {messageSuccess && <SuccesAlert texto={messageSuccess} />}
      {messageError && <ErrorAlert texto={messageError} />}
    </>
  );
};

export default TableUsers;
