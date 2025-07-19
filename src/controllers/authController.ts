
import { authService, registerUserService } from "services/authService";
import { RegisterData } from "types/user";
import { LoginRequest, LoginResponse } from "types/auth";
import { UserProfile } from "types/user";

export async function registerUserController(data: RegisterData) {
  const { firstName, lastName, email, password, confirmPassword } = data;

  // Campos obligatorios
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error("Todos los campos son obligatorios.");
  }

  // Validación de longitud de nombres
  if (firstName.trim().length < 3) {
    throw new Error("El nombre debe tener al menos 3 caracteres.");
  }

  if (lastName.trim().length < 3) {
    throw new Error("El apellido debe tener al menos 3 caracteres.");
  }

  // Validación de email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Correo electrónico inválido.");
  }

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  // Validación de contraseña
  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error("La contraseña debe contener al menos una letra mayúscula.");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un número.");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un carácter especial.");
  }


  return await registerUserService(data);
}



const TOKEN_KEY = 'auth_token'; // Clave para localStorage
const USER_INFO_KEY = 'user_info'; // Clave para información del usuario

 export const authController = {
     async handleLogin(credentials: LoginRequest): 
     Promise<{ success: boolean; message?: string; email?: UserProfile}> {
     try {
        const response: LoginResponse = await authService.login(credentials);
        // Guardar el token en localStorage
        localStorage.setItem(TOKEN_KEY, response.token);
        // Guardar la información del usuario en localStorage
        localStorage.setItem(USER_INFO_KEY, JSON.stringify({ email: credentials.email, id: response.id }));
        // Construir un UserProfile básico
        const userProfile: UserProfile = { 
            email: credentials.email, 
            id: response.id, 
            name: response.name || '', 
            createdAt: response.createdAt || new Date().toISOString() 
        };
        return { success: true, email: userProfile };
     } catch (error: any) {
     return { success: false, message: error.message || 'Credenciales inválidas' };
    }
}, 
 async handleLogout(): Promise<void> {
     try {
         await authService.logout(); 
         // Eliminar el token y la información del usuario de localStorage
         localStorage.removeItem(TOKEN_KEY);
         localStorage.removeItem(USER_INFO_KEY);
     } catch (error) {
        console.error('Error al cerrar sesión:', error);
     }
    },

    get token(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }, 
    get userInfo(): UserProfile | null {
        const userInfo = localStorage.getItem(USER_INFO_KEY);
        return userInfo ? JSON.parse(userInfo) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    }, 
}
