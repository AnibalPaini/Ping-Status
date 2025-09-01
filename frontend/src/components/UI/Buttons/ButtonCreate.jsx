import React from "react";
import IconPlus from "../Icons/IconPlus";

const ButtonCreate = ({ texto }) => {
  return (
    <button className="px-4 py-1 bg-green-400 rounded-2xl text-gray-900 font-semibold flex items-center cursor-pointer transition-colors hover:bg-green-500">
      <IconPlus />
      {texto}
    </button>
  );
};

export default ButtonCreate;
