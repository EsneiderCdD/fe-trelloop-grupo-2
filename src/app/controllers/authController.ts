// Aquí va la lógica para manejo de tokens y gestión de usuarios

import { authService } from "../services/authService";
import { LoginRequest, LoginResponse, ApiError } from "../types/auth";
import { UserProfile } from "../types/user";

const TOKEN_KEY = 'auth_token'; // Clave para localStorage
const USER_INFO_KEY = 'user_info'; // Clave para información del usuario

 export const authController = {
     async handleLogin(credentials: LoginRequest): 
     Promise<{ success: boolean; message?: string; email?: UserProfile }> {
     try {
        const response: LoginResponse = await authService.login(credentials);
        // Guardar el token en localStorage
        localStorage.setItem(TOKEN_KEY, response.token);
        // Guardar la información del usuario en localStorage
        localStorage.setItem(USER_INFO_KEY, JSON.stringify({ email: credentials.email, id: response.id }));
        return { success: true }//, email: credentials.email };
     } catch (error: any) {
     return { success: false, message: error.message || 'Credenciales inválidas' };
    }
}, 
// async handleLogout(): Promise<void> {
//     try {
//         await authService.logout(); 

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

// ***************************************
// ***************************************
// Revisar linea 19 email ?? string ?? credentials.email ??