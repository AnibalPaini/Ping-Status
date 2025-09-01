import React from "react";

const StatsInfo = ({ms, promedio}) => {
  return (
    <div className="bg-gray-800 mt-5 rounded-2xl p-10 flex justify-evenly">
      <div>
        <p className="text-gray-100 text-xl text-center font-semibold">
          Respuesta
        </p>
        <p className="text-gray-300 text-center">(Ultima)</p>
        <p className="text-center mt-2 text-lg text-gray-300">
          {ms || "Not Response"}
        </p>
      </div>
      <div>
        <p className="text-gray-100 text-xl text-center font-semibold">
          Repuesta promedio
        </p>
        <p className="text-gray-300 text-center">(1h)</p>
        <p className="text-center mt-2 text-lg text-gray-300">
          {promedio?.avgLastHour}
        </p>
      </div>
      <div>
        <p className="text-gray-100 text-xl text-center font-semibold">
          Repuesta promedio
        </p>
        <p className="text-gray-300 text-center">(24hs)</p>
        <p className="text-center mt-2 text-lg text-gray-300">
          {promedio?.avgLastDay}
        </p>
      </div>
      <div>
        <p className="text-gray-100 text-xl text-center font-semibold">
          Caidas
        </p>
        <p className="text-gray-300 text-center">(24hs)</p>
        <p className="text-center mt-2 text-lg text-gray-300">
          {promedio?.avgLastDowns}
        </p>
      </div>
    </div>
  );
};

export default StatsInfo;
