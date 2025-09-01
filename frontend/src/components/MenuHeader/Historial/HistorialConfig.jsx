import { useEffect, useState } from "react";
import { getDevices, putDevices } from "../../../APIS/deviceAPI";
import { SuccesAlert, ErrorAlert } from "../../UI/Alerts/Alerts";
import Confim from "../../UI/Alerts/Confirm";
import { TrashIconRed } from "../../UI/Icons/TrashIcon";
import { EditPenIcon } from "../../UI/Icons/EditIcon";
import { deleteHistorialByIdDevice } from "../../../APIS/deviceHistoryAPI";
import { handleApiError } from "../../../utils/handlerApiError";
import { useAutoClearMessages } from "../../../hooks/useAutoClearMessages";

const HistorialConfig = () => {
  const [listaDevices, setListaDevices] = useState([]);
  const [diasHistorial, setDiasHistorial] = useState(null);
  const [deviceSeleccionado, setDeviceSeleccionado] = useState(null);

  //Modales
  const [modalConfirm, setModalConfirm] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  useAutoClearMessages(
    messageSuccess,
    setMessageSuccess,
    messageError,
    setMessageError
  );

  let [mode, setMode] = useState("");

  useEffect(() => {
    const obtenerDevices = async () => {
      const res = await getDevices();
      setListaDevices(res.data.payload);
    };
    obtenerDevices();
  }, []);

  const handlerSelectedDevice = (e) => {
    const deviceId = e.target.value;
    const device = listaDevices.find((d) => d._id === deviceId);

    if (device) {
      setDeviceSeleccionado(device);
      setDiasHistorial(device.historyRetentionDays);
      console.log(
        "Seleccionado:",
        device.name,
        " -> ",
        device.historyRetentionDays
      );
    }
  };

  const handlerEditDays = async () => {
    try {
      if (diasHistorial >= 0) {
        await putDevices(deviceSeleccionado._id, {
          ...deviceSeleccionado,
          historyRetentionDays: diasHistorial,
        });
        setMessageSuccess("Días de historial actualizados");
      } else {
        setMessageError("Los días de historial deben ser 0 o mayor");
      }
    } catch (error) {
      handleApiError(
        error,
        setMessageError,
        "Error al actualizar los días de historial"
      );
    }
  };

  const handlerDeleteDevice = async () => {
    try {
      console.log(deviceSeleccionado);

      await deleteHistorialByIdDevice(deviceSeleccionado._id);
      setMessageSuccess("Historial eliminado");
    } catch (error) {
      handleApiError(
        error,
        setMessageError,
        "Error al eliminar el historial"
      );
    }
  };

  return (
    <div>
      <p className="text-gray-400 font-semibold text-xl mb-2">Historial</p>
      <form className="w-full mt-5">
        <div className="flex flex-col sm:flex-row space-x-1 mb-4 w-full">
          <div className="flex flex-col w-full ">
            <label className="text-gray-200 mb-1 ml-1">Dispositivo</label>
            <select
              name=""
              onChange={handlerSelectedDevice}
              className="bg-gray-700 text-gray-300 p-2 rounded-lg w-full 
            mb-3 sm:mb-0"
            >
              <option value="0">Seleccionar device</option>
              {listaDevices.map((device) => (
                <option key={device._id} value={device._id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-200 mb-1 ml-1">
              Días de guardado{" "}
              <span className="text-sm text-gray-600">(0 infinito)</span>
            </label>
            <input
              type="number"
              value={diasHistorial || 0}
              onChange={(e) => setDiasHistorial(e.target.value)}
              className="bg-gray-700 text-gray-300 p-2 rounded-lg w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4">
          <div
            onClick={() => {
              setModalConfirm(true);
              setMode("edit");
            }}
          >
            <EditPenIcon className="w-6 h-6 text-blue-500" />
          </div>

          <div
            onClick={() => {
              setModalConfirm(true);
              setMode("delete");
            }}
          >
            <TrashIconRed className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </form>
      {modalConfirm && (
        <Confim
          texto={`¿Estás seguro de que deseas ${mode} el historial del dispositivo ${deviceSeleccionado?.name}?`}
          onConfirm={async () => {
            if (mode === "edit") {
              await handlerEditDays();
            } else if (mode === "delete") {
              await handlerDeleteDevice();
            }
            setModalConfirm(false);
          }}
          onCancel={() => setModalConfirm(false)}
        />
      )}
      {/* Alertas */}
      {messageSuccess && <SuccesAlert texto={messageSuccess} />}
      {messageError && <ErrorAlert texto={messageError} />}
    </div>
  );
};

export default HistorialConfig;
