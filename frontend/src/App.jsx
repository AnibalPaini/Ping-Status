import { SocketProvider } from "./context/SocketProvider.jsx";
import { SocketDataProvider } from "./context/SocketDataContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Login from "./components/Login.jsx";

import Template2 from "./components/Template2";

function AppContent() {
  const { usuario, cargando } = useAuth();

  if (cargando)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-4xl">Cargando...</p>
      </div>
    );

  if (!usuario) return <Login />; // Si no hay usuario logueado

  return <Template2 />; // Si hay usuario logueado
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <SocketDataProvider>
          <AppContent />
        </SocketDataProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
