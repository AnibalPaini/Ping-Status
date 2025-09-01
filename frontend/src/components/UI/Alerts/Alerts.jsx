import React from "react";
import CheckIcon from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";

export const SuccesAlert = ({ texto }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute top-2">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-96 text-center">
          <CheckIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-100 mb-6">{texto}</p>
        </div>
      </div>
    </div>
  );
};

export const ErrorAlert = ({ texto }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="absolute top-2">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-96 text-center">
          <ErrorIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-100 mb-6">{texto}</p>
        </div>
      </div>
    </div>
  );
};
