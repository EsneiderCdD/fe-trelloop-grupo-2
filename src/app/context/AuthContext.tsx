// Aquí se contiene el estado de autenticación del usuario (user, isAuthenticated) 
// y las funciones para modificarlo (login, logout).

// Este contexto será el puente entre la lógica de autenticación (en controllers/authController.ts) 
// y los componentes de la UI que necesitan saber si el usuario está logueado o poder disparar un login/logout

"use client";


import React, { createContext, useContext, useState, useEffect } from 'react';
import { authController } from '../controllers/authController';
import { LoginRequest } from '../types/auth';
import { UserProfile } from '../types/user';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar la app, verificar si ya hay un token y usuario
    const storedUser = authController.userInfo;
    if (authController.isAuthenticated() && storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    const result = await authController.handleLogin(credentials);
    if (result.success && result.email) {
      setUser(result.email);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

   const handleLogout = async () => {
     setLoading(true);
     await authController.handleLogout();
     setUser(null);
     setLoading(false);
   };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

//Queda pendiente agregar el spinner de carga en los componentes que lo necesiten
// y manejar el estado de loading en los componentes que lo requieran.