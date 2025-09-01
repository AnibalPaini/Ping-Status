import React from "react";


const colorMap = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  gray: "bg-gray-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
};


const TagsDevice = ({ device }) => {
  return (
    <div className="flex items-center pl-[4.5rem] mt-1 space-x-1 ">
      {device.tag.map((t) => (
        <p
          className={`px-2 py-1 w-fit rounded-2xl text-center text-xs ${
            colorMap[t.color]
          }`}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
};

export default TagsDevice;
