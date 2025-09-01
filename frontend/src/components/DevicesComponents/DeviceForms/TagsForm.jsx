import React, { useState, useEffect } from "react";
import { postTag, getTags } from "../../../APIS/tagsAPI";
import Select from "react-select";
import { ErrorAlert } from "../../UI/Alerts/Alerts";
import { handleApiError } from "../../../utils/handlerApiError";

const TagsForm = ({ mode = "select", setModal, onSelectTag, setNewTag }) => {
  const [nameTag, setNameTag] = useState("");
  const [colorTag, setColorTag] = useState("");
  const [listadoTags, setListadoTags] = useState([]);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (mode !== "post") {
      obtenerTags();
    }
  }, [mode]);

  const obtenerTags = async () => {
    try {
      const res = await getTags();
      setListadoTags(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTag = async () => {
    try {
      const res = await postTag({ name: nameTag, color: colorTag });
      const nuevaTag = res.data.payload;
      if (onSelectTag) onSelectTag(nuevaTag); // agregar directamente al form si corresponde
      setNewTag(true)
      setNameTag("");
      setColorTag("");
      setModal(false);
    } catch (error) {
      handleApiError(error, setMessageError, "Error al actualizar dispositivo");
    }
  };

  // Colores de Tailwind
  const tailwindColors = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    purple: "#8b5cf6",
    yellow: "#eab308",
    gray: "#6b7280",
    pink: "#ec4899",
  };

  const opcionesColor = [
    { value: "red", label: "Rojo" },
    { value: "blue", label: "Azul" },
    { value: "green", label: "Verde" },
    { value: "purple", label: "Violeta" },
    { value: "yellow", label: "Amarillo" },
    { value: "gray", label: "Gris" },
    { value: "pink", label: "Rosa" },
  ];

  const formatColorOption = ({ label, value }) => (
    <div
      style={{
        backgroundColor: tailwindColors[value],
        padding: "4px 10px",
        borderRadius: "9999px",
        color: "white",
        fontWeight: 500,
        fontSize: "0.85rem",
        width: "fit-content",
      }}
    >
      {label}
    </div>
  );

  const opcionesTags = listadoTags.map((tag) => ({
    value: tag._id,
    label: tag.name,
    color: tailwindColors[tag.color],
    tagObj: tag,
  }));

  const formatOptionLabel = ({ label, color }) => (
    <div
      className="rounded-full px-3 py-1 text-white text-sm font-semibold inline-block"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );

  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center bg-gray-700/80 bg-opacity-50"
      onClick={() => setModal(false)}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 shadow-xl flex flex-col gap-4 w-full max-w-md text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-100">Agregar Tag</h2>

        {mode !== "post" && (
          <div className="w-full">
            <Select
              options={opcionesTags}
              placeholder="Selecciona una etiqueta..."
              isClearable
              formatOptionLabel={formatOptionLabel}
              onChange={(option) => {
                if (option && onSelectTag) onSelectTag(option.tagObj);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#374151",
                  borderColor: "#4b5563",
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? "#4b5563" : "transparent",
                  cursor: "pointer",
                }),
              }}
            />
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearTag();
          }}
        >
          <div className="flex space-x-2">
            <div className="w-full">
              <input
                type="text"
                placeholder="Nombre"
                onChange={(e) => setNameTag(e.target.value)}
                value={nameTag}
                className="px-2 py-1.5 rounded-sm bg-gray-700 border border-gray-600 text-white font-light"
              />
            </div>
            <div className="w-full">
              <Select
                options={opcionesColor}
                formatOptionLabel={formatColorOption}
                placeholder="Color"
                onChange={(option) => setColorTag(option.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#374151",
                    borderColor: "#4b5563",
                    color: "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                  }),
                  singleValue: (base, { data }) => ({
                    ...base,
                    backgroundColor: tailwindColors[data.value],
                    borderRadius: "9999px",
                    padding: "2px 10px",
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }),
                }}
              />
            </div>
          </div>
          <div className="flex w-full justify-end mt-3">
            <button className="bg-green-500 px-4 py-1 rounded-2xl text-gray-800 font-semibold">
              Añadir
            </button>
          </div>
        </form>
      </div>
      {messageError && <ErrorAlert texto={messageError} />}
    </div>
  );
};

export default TagsForm;
