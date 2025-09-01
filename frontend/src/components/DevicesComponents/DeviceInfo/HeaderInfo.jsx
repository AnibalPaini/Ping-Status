import React, { useState } from "react";
import PauseIcon from "../../UI/Icons/PauseIcon.jsx";
import { EditIcon } from "../../UI/Icons/EditIcon.jsx";
import { TrashIcon } from "../../UI/Icons/TrashIcon.jsx";
import Confirm from "../../UI/Alerts/Confirm.jsx";

const HeaderInfo = ({
  setPagina,
  device,
  setUpdateDevice,
  handlerDeleteDevice,
  handlerPauseDevice,
}) => {
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <>

        <h2 className="text-gray-400 font-semibold text-3xl">{device.name}</h2>
        <p className="text-gray-500 text-md mb-2"> - {device.description}</p>

      <p className="text-green-500 font-bold text-md ml-1">{device.ip}</p>
      <div className="flex w-fit text-gray-300 mt-3">
        <button
          className="flex items-center gap-x-1 cursor-pointer py-2 px-4 bg-gray-800 hover:bg-gray-900 rounded-l-2xl"
          onClick={() => handlerPauseDevice()}
        >
          <PauseIcon />
          Pausar
        </button>
        <button
          className="flex items-center gap-x-1 cursor-pointer py-2 px-4 bg-gray-800 hover:bg-gray-900"
          onClick={() => {
            setUpdateDevice(device);
            setPagina("edit");
          }}
        >
          <EditIcon />
          Editar
        </button>
        <button
          className="flex items-center gap-x-1 bg-red-600 cursor-pointer py-2 px-4 rounded-r-2xl text-gray-50 hover:bg-red-700"
          onClick={() => setConfirmModal(true)}
        >
          <TrashIcon />
          Eliminar
        </button>
      </div>
      {confirmModal && (
        <Confirm
          texto="¿Estás seguro de que deseas eliminar este dispositivo?"
          onConfirm={handlerDeleteDevice}
          onCancel={() => setConfirmModal(false)}
        />
      )}
    </>
  );
};

export default HeaderInfo;
