import React, { useState } from "react";
import ButtonCreate from "../../UI/Buttons/ButtonCreate";

const ModalesUsuarios = ({ mode, setModal, onSubmit, defaultValues = {} }) => {
  const [formData, setFormData] = useState({
    user: defaultValues.user || "",
    password: "",
    oldPassword: "",
    rol: defaultValues.rol || "visor",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // delega la acción al padre
  };

  return (
    <div
      className="flex justify-center items-center z-50 fixed inset-0 bg-gray-700/80"
      onClick={() => setModal(false)}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 shadow-xl flex flex-col gap-4 w-full max-w-md text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-100">
          {mode === "create" ? "Crear usuario" : "Editar usuario"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          {mode !== "perfil" && (
            <div className="flex flex-col mt-2">
              <label className="text-gray-200 mb-1 ml-1">Usuario</label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="bg-gray-700 text-gray-300 p-2 rounded-lg"
              />
            </div>
          )}

          {/* Clave */}
          <div className="flex flex-col mt-2">
            <label className="text-gray-200 mb-1 ml-1">Clave nueva</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 text-gray-300 p-2 rounded-lg"
            />
          </div>

          {mode === "perfil" && (
            <div className="flex flex-col mt-2">
              <label className="text-gray-200 mb-1 ml-1">
                Confirme clave nueva
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="bg-gray-700 text-gray-300 p-2 rounded-lg"
              />
            </div>
          )}

          {/* Clave vieja (solo update) */}
          {mode === "update" ||
            (mode === "perfil" && (
              <div className="flex flex-col mt-2">
                <label className="text-gray-200 mb-1 ml-1">Clave vieja</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="bg-gray-700 text-gray-300 p-2 rounded-lg"
                />
              </div>
            ))}

          {/* Rol (solo create) */}
          {mode === "create" && (
            <div className="flex flex-col mt-2">
              <label className="text-gray-200 mb-1 ml-1">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="bg-gray-700 text-gray-300 p-2 rounded-lg"
              >
                <option value="admin">Admin</option>
                <option value="visor">Visor</option>
              </select>
            </div>
          )}

          <div className="flex justify-end mt-5">
            <ButtonCreate
              texto={mode === "create" ? "Crear usuario" : "Actualizar usuario"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalesUsuarios;
