// Aquí irán las funciones para enviar las credenciales de login al backend, 
// recibir el token, y posiblemente manejar el cierre de sesión si requiere una llamada al servidor 
// Aquí es donde se definirá cómo se envía el email y la contraseña al backend y cómo se recibe la respuesta (el token)

import { AUTH_ENDPOINTS } from '../constants/apiEndpoints';
import { LoginRequest, LoginResponse, ApiError } from '../types/auth';


export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await fetch(AUTH_ENDPOINTS.lOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }

            const data: LoginResponse = await response.json();
            return data;
    
            } catch (error) {
                console.error('Error en el login:', error);
                throw error;
            
            }
        },
    async logout(): Promise<void> {
    }
    }
