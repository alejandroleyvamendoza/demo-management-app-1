"use client";
import { useSession, SessionProvider as Provider } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IUser } from "../module/role/repository/interfaces";
import { IUser } from 'app/app/module/role/repository/interfaces';


// Crear el contexto
const AppContext: any = createContext({
  users: null,
  modalVisible: null,
  setModalVisible: () => { }
});

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const [modalVisible, setModalVisible] = useState(false);

  console.log('====================== AUTHCONTEXT ======================', { session });

  return (
    <AppContext.Provider value={{ user, setUser, users, setUsers, loading, status: session.status, modalVisible, setModalVisible }}>
      {children}
    </AppContext.Provider>

  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext<IAppContext>(AppContext);

interface IAppContext {
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  users: IUser[],
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
  login: any,
  logout: any,
  loading: any,
  status: any,
  modal: boolean
}
