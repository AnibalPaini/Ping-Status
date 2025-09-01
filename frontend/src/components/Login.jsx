import React, { useState } from "react";
import Header from "./Header";
import { login, getPerfil } from "../APIS/usersAPI";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUsuario } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlerLogin = async () => {
    try {
      await login({ user, password });
      const res = await getPerfil();
      setUsuario(res.data.payload);
    } catch (error) {
      if (error.status === 401) {
        setError("Usuario o clave incorrecta!");
      }
      if (error.status === 400) {
        setError("Complete los campos requeridos.");
      } else {
        setError("Error al iniciar sesión!");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-800">
      <Header />

      <div className="flex items-center justify-center mt-10">
        <form
          className="bg-gray-900 p-8 rounded-lg shadow-xl w-80"
          onSubmit={(e) => {
            e.preventDefault();
            handlerLogin();
          }}
        >
          <img
            src="/img/PingStatus-blanco.png"
            alt="Ping Status Logo"
            className="w-50 mx-auto my-4"
          />

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Clave
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500  text-white font-semibold py-2 rounded-md transition-colors"
          >
            Ingresar
          </button>
          {error !== "" && (
            <p className="text-red-500 mt-3 text-center text-lg font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
