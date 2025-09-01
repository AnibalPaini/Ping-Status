import React, { useState } from "react";
import { getDevices } from "../../../APIS/deviceAPI";
import TagsForm from "./TagsForm";

const DeviceForm = ({ mode = "create", initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    ip: initialData.ip || "",
    description: initialData.description || "",
    isConnected: initialData.isConnected || false,
    notifications: initialData.notifications || false,
    tag: initialData.tag || [],
    historial: initialData.historyRetentionDays || 0,
  });

  const [modalTags, setModalTags] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = (tag) => {
    if (!form.tag.some((t) => t._id === tag._id)) {
      setForm((prev) => ({ ...prev, tag: [...prev.tag, tag] }));
    }
    setModalTags(false);
  };

  const handleRemoveTag = (id) => {
    setForm((prev) => ({
      ...prev,
      tag: prev.tag.filter((t) => t._id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    getDevices();
  };

  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-6">
        {mode === "edit" ? "Editar Dispositivo" : "Crear Dispositivo"}
      </h2>

      <form
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-white"
        onSubmit={handleSubmit}
      >
        {/* Tipo */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="tipo">
            Tipo de monitor
          </label>
          <select
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ping">Ping</option>
          </select>
        </div>

        {/* Nombre */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="name">
            Nombre del dispositivo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* IP */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="ip">
            IP del dispositivo
          </label>
          <input
            type="text"
            id="ip"
            name="ip"
            value={form.ip}
            onChange={handleChange}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="description">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dias en historial */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="historial">
            Días que se mantiene en el historial  <span className="text-sm text-gray-600">(0 infinito)</span>
          </label>
          <input
            type="number"
            id="historial"
            name="historial"
            placeholder="7"
            value={form.historial}
            onChange={handleChange}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium mb-1 block">Etiqueta</label>
          <button
            type="button"
            className="px-8 py-0.5 rounded-2xl border border-gray-400 cursor-pointer"
            onClick={() => setModalTags(true)}
          >
            Agregar etiqueta
          </button>

          {form.tag.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {form.tag.map((tag) => (
                <div key={tag._id} className="flex items-center gap-1">
                  <span
                    className={`px-4 py-1 w-fit rounded-2xl text-center text-md cursor-pointer bg-${tag.color}-500 hover:bg-gray-400 transition`}
                    onClick={() => handleRemoveTag(tag._id)}
                  >
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex gap-x-10">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isConnected"
              checked={form.isConnected}
              onChange={handleChange}
              className="accent-blue-500 w-5 h-5"
            />
            <span className="font-medium">Conectado?</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="notifications"
              checked={form.notifications}
              onChange={handleChange}
              className="accent-blue-500 w-5 h-5"
            />
            <span className="font-medium">Notificaciones?</span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="font-semibold px-4 py-2 text-black bg-green-400 cursor-pointer"
          >
            {mode === "edit" ? "Guardar cambios" : "Crear dispositivo"}
          </button>
        </div>
      </form>

      {modalTags && (
        <TagsForm
          mode="select"
          setModal={setModalTags}
          onSelectTag={handleAddTag}
        />
      )}
    </div>
  );
};

export default DeviceForm;
