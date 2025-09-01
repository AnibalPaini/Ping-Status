import React, { useEffect, useState } from "react";
import { getTags, deleteTag } from "../../APIS/tagsAPI";
import TagPost from "../DevicesComponents/DeviceForms/TagsForm";
import ButtonCreate from "../UI/Buttons/ButtonCreate";
import { TrashIconRed } from "../UI/Icons/TrashIcon";
import Confirm from "../UI/Alerts/Confirm";
import { SuccesAlert, ErrorAlert } from "../UI/Alerts/Alerts.jsx";
import { useAutoClearMessages } from "../../hooks/useAutoClearMessages.jsx";
import { handleApiError } from "../../utils/handlerApiError.js";

const EtiquetasConfig = () => {
  const [listaEtiquetas, setListaEtiquetas] = useState([]);
  const [modalCrearTag, setModalCrearTag] = useState(false);
  const [newTag, setNewTag] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [idTag, setIdTag] = useState(null);

  useEffect(() => {
    obtenerTags();
    setNewTag(false);
  }, [newTag]);

  const obtenerTags = async () => {
    try {
      const res = await getTags();
      setListaEtiquetas(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  // Mensajes de éxito y error
  const [messageSucces, setMessageSucces] = useState("");
  const [messageError, setMessageError] = useState("");

  useAutoClearMessages(messageSucces, setMessageSucces, messageError, setMessageError);

  const eliminarTag = async (id) => {
    try {
      await deleteTag(id);
      obtenerTags();
      setModalConfirm(false);
      setIdTag(null);
      setMessageSucces("Etiqueta eliminada correctamente");
    } catch (error) {
      handleApiError(error, setMessageError, "Error al eliminar la etiqueta");
      setModalConfirm(false);
      setIdTag(null);
    }
  };

  return (
    <div>
  <p className="text-gray-400 font-semibold text-xl mb-2">Etiquetas</p>
  {messageSucces && <SuccesAlert texto={messageSucces} />}
  {messageError && <ErrorAlert texto={messageError} />}
      <div className="space-y-2">
        <div
          className="w-fit mt-2 mb-5"
          onClick={() => {setModalCrearTag(true);
          }}
        >
          <ButtonCreate texto="Crear etiqueta" />
        </div>
        {listaEtiquetas.map((tag) => (
          <div
            className="flex justify-between border-b border-gray-600 py-2 
                 first:border-t last:border-b-0"
            key={tag._id}
          >
            <p
              className={`bg-${tag.color}-500 px-2 py-1 w-fit rounded-2xl text-center text-md`}
            >
              {tag.name}
            </p>
            <div onClick={() => {setModalConfirm(true); setIdTag(tag._id)}}>
              <TrashIconRed className={"h-10 w-10"} />
            </div>
          </div>
        ))}
      </div>
      {modalCrearTag && (
        <TagPost
          setModal={setModalCrearTag}
          mode="post"
          setNewTag={setNewTag}
        />
      )}
      {modalConfirm && (
        <Confirm
          onCancel={() => setModalConfirm(false)}
          onConfirm={()=>eliminarTag(idTag)}
          texto={"¿Estás seguro de eliminar esta etiqueta?"}
        />
      )}
    </div>
  );
};

export default EtiquetasConfig;
