import React, { useState } from "react";
import ListaDispositivos from "./DevicesComponents/ListaDispositivos";
import DeviceInfo from "./DevicesComponents/DeviceInfo/DeviceInfo";
import AllDevices from "./DevicesComponents/AllDevices";
import Header from "./Header";
import DeviceForm from "./DevicesComponents/DeviceForms/DeviceForm";
import Config from "./MenuHeader/Config";
import { putDevices, postDevices } from "../APIS/deviceAPI";
import Perfil from "./MenuHeader/Perfil/Perfil";
import Footer from "./Footer";
import { SuccesAlert, ErrorAlert } from "./UI/Alerts/Alerts";
import { handleApiError } from "../utils/handlerApiError.js";
import { useAutoClearMessages } from "../hooks/useAutoClearMessages.jsx";

const Template = () => {
  const [pagina, setPagina] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState();
  const [actualizar, setActualizar] = useState(false);
  const [updateDevice, setUpdateDevice] = useState(null); //Abre el componente de actualizar
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

    useAutoClearMessages(
      messageSuccess,
      setMessageSuccess,
      messageError,
      setMessageError
    );


  const handleUpdateDevice = async (id, formData) => {
    try {
      if (!formData) {
        handleApiError("Debe completar los campos!");
      }
      await putDevices(id, formData);
      setActualizar(true);
      setMessageSuccess("Dispositivo actualizado con éxito!");
      setPagina(null);
    } catch (error) {
      handleApiError(error, setMessageError, "Error al actualizar dispositivo");
    }
  };

  const handleCreateDevice = async (formData) => {
    try {
      if (!formData) {
        handleApiError("Debe completar los campos!");
      }

      await postDevices(formData);

      setActualizar(true);
      setMessageSuccess("Dispositivo creado con éxito!");
      setPagina(null);
    } catch (error) {
      handleApiError(error, setMessageError, "Error al crear dispositivo");
    }
  };

  const renderSiwtch = (pagina) => {
    switch (pagina) {
      case "info":
        return (
          <DeviceInfo
            device={selectedDevice}
            setActualizar={setActualizar}
            setUpdateDevice={setUpdateDevice}
            setPagina={setPagina}
          />
        );
      case "all":
        return <AllDevices />;
      case "create":
        return (
          <DeviceForm
            mode="create"
            initialData={{
              ip: "",
              name: "",
              isConnected: false,
              notifications: false,
              description: "",
              tag: [],
            }}
            listadoTags={[]}
            onSubmit={handleCreateDevice}
          />
        );
      case "edit":
        return (
          <DeviceForm
            mode="edit"
            initialData={updateDevice}
            listadoTags={[]}
            onSubmit={(formData) =>
              handleUpdateDevice(updateDevice._id, formData)
            }
          />
        );
      case "list":
        return (
          <ListaDispositivos
            onSelectDevice={setSelectedDevice}
            setPagina={setPagina}
            actualizar={actualizar}
            setActualizar={setActualizar}
          />
        );
      case "config":
        return (
          <Config
            setPagina={setPagina}
            actualizar={actualizar}
            setActualizar={setActualizar}
          />
        );
      case "perfil":
        return (
          <Perfil
            setPagina={setPagina}
            actualizar={actualizar}
            setActualizar={setActualizar}
          />
        );
      default:
        return <AllDevices />;
    }
  };

  return (
    <div className="h-screen bg-gray-700 flex flex-col">
      <Header setSelectedDevice={setSelectedDevice} setPagina={setPagina} />

      {/* Alertas */}
      {messageSuccess && <SuccesAlert texto={messageSuccess} />}
      {messageError && <ErrorAlert texto={messageError} />}

      <main className="flex-1 bg-gray-700 grid grid-cols-1 lg:grid-cols-3">
        {/* Sidebar SOLO visible en pantallas grandes */}
        <div className="hidden lg:block">
          <ListaDispositivos
            onSelectDevice={setSelectedDevice}
            setPagina={setPagina}
            actualizar={actualizar}
            setActualizar={setActualizar}
          />
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-2 p-4">{renderSiwtch(pagina)}</div>
      </main>

      {/* Footer SOLO visible en pantallas chicas */}
      <div className="block lg:hidden">
        <Footer setPagina={setPagina} />
      </div>
    </div>
  );
};

export default Template;
