"use client";
import { useSession, SessionProvider as Provider } from "next-auth/react";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { IUser } from "../module/role/repository/interfaces";
import { IUser } from 'app/app/module/role/repository/interfaces';
import { Session } from "next-auth";


// Crear el contexto
const AppContext: any = createContext({
  user: null,
  users: null,
  modalVisible: null,
  setModalVisible: () => { }
});

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);

  const session = useSession<boolean>();

  const [modalVisible, setModalVisible] = useState(false);

    const contextValue = useMemo(
      () => ({
        user,
        setUser,
        selectedUserForUpdate,
        setSelectedUserForUpdate,
        users,
        setUsers,
        loading,
        session,
        modalVisible,
        setModalVisible
      }),
      [user, selectedUserForUpdate, users, loading, session, modalVisible]
    );
  

  console.log('====================== AUTHCONTEXT ======================', { session });

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>

  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext<IAppContext>(AppContext);

export interface IAppContext {
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  users: IUser[],
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
  selectedUserForUpdate: IUser,
  setSelectedUserForUpdate: React.Dispatch<React.SetStateAction<IUser>>,
  login: any,
  logout: any,
  loading: any,
  status: any,
  modal: boolean
  session: any
}
