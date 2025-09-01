import { useEffect } from "react";

export const useAutoClearMessages = (
  messageSucces,
  setMessageSucces,
  messageError,
  setMessageError,
  delay = 2000
) => {
  useEffect(() => {
    if (messageSucces || messageError) {
      const timer = setTimeout(() => {
        setMessageSucces("");
        setMessageError("");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [messageSucces, messageError, setMessageSucces, setMessageError, delay]);
};
