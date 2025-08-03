import { create } from 'zustand';
import { authController } from '../controllers/authController';
import { LoginRequest } from '../types/auth';
import { UserProfile } from '../types/user';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, //al cargar por primera vez
  isAuthenticated: false,

  //LOGIN
  login: async (credentials: LoginRequest) => {
    set({ loading: true });
    const result = await authController.handleLogin(credentials);
    if (result.success && result.email) {
      set({ user: result.email, isAuthenticated: true, loading: false });
      return true;
    }
    set({ loading: false });
    return false;
  },

  //LOGOUT
  logout: async () => {
    set({ loading: true });
    await authController.handleLogout();
    set({ user: null, isAuthenticated: false, loading: false });
  },

  //HIDRATAR estado al iniciar la app
  hydrate: () =>{
    const token = authController.token;
    const userInfo = authController.userInfo;

    if (token && userInfo) {
      set({ 
        user: userInfo, 
        isAuthenticated: true, 
        loading: false });
    } else {
      set({ loading: false });
    }    
  },
}));

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};