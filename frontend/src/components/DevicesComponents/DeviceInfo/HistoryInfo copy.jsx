import React from "react";

const HistoryInfo = ({ historial }) => {
  return (
    <table className="w-full table-auto border-collapse">
      {historial.length !== 0 && (
        <thead>
          <tr className="">
            <th className="text-gray-100 px-4 py-2 text-left">Estado</th>
            <th className="text-gray-100 px-4 py-2 text-left">Fecha y hora</th>
            <th className="text-gray-100 px-4 py-2 text-left">Mensaje</th>
            <th onClick={() => {console.log(historial)}}>
                  <button>a</button>
                </th>
          </tr>
        </thead>
      )}
      <tbody>
        {historial.history.length !== 0 ? (
          historial?.flatMap((his) =>
            his.history.map((entry, index) => (
              <tr key={`${his._id}-${index}`}>
                <td className="text-white px-4 py-2 font-semibold">
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm ${
                      entry.status === "UP"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="text-white px-4 py-2">
                  {new Date(entry.time).toLocaleString()}
                </td>
                <td className="text-white px-4 py-2" title={entry.message}>
                  {entry.message
                    ? entry.message.length > 100
                      ? entry.message.slice(0, 100) + "..."
                      : entry.message
                    : "Sin mensaje"}
                </td>
              </tr>
            ))
          )
        ) : (
          <tr className="text-gray-100 text-xl">
            <td>No hay datos del historial...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default HistoryInfo;
