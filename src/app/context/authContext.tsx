"use client";
import { useSession, SessionProvider as Provider } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";


// Crear el contexto
const AuthContext = createContext({});

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();


  // Simulamos la obtención de datos de sesión (puedes cambiarlo por una llamada a una API)
  useEffect(() => {
    console.log('________________________________________________________________', { status });

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const pathname = usePathname();
  return (

    <AuthContext.Provider value={{ user, login, logout, loading, status }}>
      {children}
    </AuthContext.Provider>

  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
