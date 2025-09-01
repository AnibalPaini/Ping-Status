import React from "react";

const Confirm = ({ texto, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute top-2">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-96 text-center">
          {/* Texto de la alerta */}
          <p className="text-xl font-medium text-gray-100 mb-6">{texto}</p>

          {/* Botones */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={onCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
