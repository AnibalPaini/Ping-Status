import React from "react";

const PingsDevice = ({ pings }) => {
  return (
    <div className="flex space-x-1 mt-1">
      {pings.map((ping, index) => (
        <span
          key={index}
          title={"Status: " + ping.status + " - " + "ms: " + ping.ms}
          className={`h-4 w-2 rounded-2xl transform hover:scale-110 ${
            ping.status === "UP"
              ? "bg-green-500"
              : ping.status === "DOWN"
              ? "bg-red-500"
              : ping.status === "PAUSED"
              ? "bg-gray-400"
              : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

export default PingsDevice;
