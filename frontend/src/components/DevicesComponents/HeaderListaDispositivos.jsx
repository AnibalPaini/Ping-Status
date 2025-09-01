import React, { useState, useEffect } from "react";
import { getTags } from "../../APIS/tagsAPI";
import Select from "react-select";
import ButtonCreate from "../UI/Buttons/ButtonCreate";
import IconLens from "../UI/Icons/IconLens";
import { useAuth } from "../../context/AuthContext";

const HeaderListaDispositivos = ({
  setFiltros,
  setBusqueda,
  setPagina,
  onSelectDevice,
}) => {
  const { usuario } = useAuth();

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
  const estados = [
    { value: "funcional", label: "Funcional", color: "#4caf50" },
    { value: "pausados", label: "Pausados", color: "#9e9e9e" },
    { value: "caidos", label: "Caídos", color: "#f44336" },
    { value: "desconectados", label: "Desconectados", color: "#0D0F12" },
  ];

  const [tags, setTags] = useState([]);
  const [filtroTag, setFiltroTag] = useState({});
  const [filtroEstado, setFiltroEstado] = useState({});

  useEffect(() => {
    obtenerTags();
  }, []);

  useEffect(() => {
    setFiltros({ filtroTag, filtroEstado });
  }, [filtroTag, filtroEstado]);

  const obtenerTags = async () => {
    try {
      const res = await getTags();
      setTags(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const opcionesTags = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
    color: tailwindColors[tag.color],
    tagObj: tag,
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1E2939",
      borderColor: "#1E2939",
      borderRadius: "16px",
      padding: "2px 4px",
      minHeight: "38px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#2e7d32",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#4A5565",
      borderRadius: "16px",
      width: "fit",
      padding: "4px",
    }),
    option: (base, { data, isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? data.color
        : isFocused
        ? `${data.color}cc`
        : undefined,
      color: "#fff",
      borderRadius: "12px",
      padding: "8px 12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    singleValue: (base, { data }) => ({
      ...base,
      color: "#fff",
      backgroundColor: data.color || "#333",
      borderRadius: "12px",
      padding: "2px 8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    multiValue: (base, { data }) => ({
      ...base,
      backgroundColor: data.color || "#ccc",
      borderRadius: "12px",
      padding: "2px 6px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#fff",
      ":hover": {
        backgroundColor: "rgba(0,0,0,0.2)",
        color: "#fff",
      },
    }),
  };

  const Option = (props) => {
    const { data, innerRef, innerProps, isFocused, isSelected } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          backgroundColor: isSelected
            ? data.color
            : isFocused
            ? "rgba(255, 255, 255, 0.2)"
            : undefined,

          color: "#fff",
          borderRadius: 12,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            backgroundColor: data.color,
            width: 12,
            height: 12,
            borderRadius: "50%",
            display: "inline-block",
          }}
        />
        {data.label}
      </div>
    );
  };

  const SingleValue = ({ data, ...props }) => (
    <div
      style={{
        backgroundColor: data.color,
        borderRadius: 12,
        padding: "2px 8px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      {...props.innerProps}
    >
      <span
        style={{
          backgroundColor: data.color,
          width: 12,
          height: 12,
          borderRadius: "50%",
          display: "inline-block",
        }}
      />
      {data.label}
    </div>
  );

  return (
    <div className="w-full bg-gray-600 px-2 py-4 rounded-t-xl">
      <div className="flex justify-between w-full">
        {usuario.rol !== "visor" && usuario.rol !== null && (
            <div
              className="items-center hidden sm:flex"
              onClick={() => {
                setPagina("create");
                onSelectDevice(null);
              }}
            >
              <ButtonCreate texto={"Crear nuevo"} />
            </div>
        )}

        <div className="flex items-center w-full sm:w-auto justify-end">
          <IconLens />
          <input
            type="text"
            placeholder="Buscar..."
            className="py-1 px-2 border rounded-2xl border-gray-900 bg-gray-800 text-gray-300 focus:outline-none focus:border-green-600 transition-colors w-full sm:w-auto"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-3 w-full justify-between sm:justify-normal">
        <Select
          options={opcionesTags}
          styles={customStyles}
          placeholder="Etiqueta"
          components={{ Option, SingleValue }}
          onChange={(selectedOptions) => {
            setFiltroTag(
              selectedOptions ? selectedOptions.map((opt) => opt.value) : []
            );
          }}
          isMulti
        />
        <Select
          options={estados}
          styles={customStyles}
          placeholder="Estado"
          isClearable={true}
          onChange={(selectedOptions) => {
            setFiltroEstado(selectedOptions);
          }}
        />
      </div>
    </div>
  );
};

export default HeaderListaDispositivos;
