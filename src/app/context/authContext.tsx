"use client";
import { useSession, SessionProvider as Provider } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";


// Crear el contexto
const AppContext: any = createContext({
  modalVisible: null,
  setModalVisible: () => { }
});

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const [modalVisible, setModalVisible] = useState(false);

  console.log('====================== AUTHCONTEXT ======================', { session });

  return (
    <AppContext.Provider value={{ user, loading, status: session.status, modalVisible, setModalVisible }}>
      {children}
    </AppContext.Provider>

  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext<IAppContext>(AppContext);

interface IAppContext {
  user: any,
  login: any,
  logout: any,
  loading: any,
  status: any,
  modal: boolean
}
