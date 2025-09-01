// utils/errorHandler.js
export const handleApiError = (
  error,
  setMessageError,
  defaultMessage = "Error en la operación"
) => {
  if (error?.response?.status === 400 || error?.response?.status === 404) {
    setMessageError(error.response.data.error);
  } else if (
    error?.response?.status === 403 ||
    error?.response?.status === 401
  ) {
    setMessageError("No tienes permisos suficientes");
  } else if (error?.status === 401 || error?.status === 403) {
    setMessageError("No tienes permisos suficientes");
  } else {
    setMessageError(defaultMessage);
  }
};
