import { RegisterData } from "@/types/user";
import {registerUserService} from "@/services/authService";
import { ValidationError } from '@/types/validatesError';

export async function registerUserController(data: RegisterData) {
  const { firstName, lastName, email, password, confirmPassword } = data;

  // Campos obligatorios
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new ValidationError("Todos los campos son obligatorios.", "general"); 
  }

  // Validación de longitud de nombres
  if (firstName.trim().length < 3) {
    throw new ValidationError("El nombre debe tener al menos 3 caracteres.", "firstName");
  }

  if (lastName.trim().length < 3) {
    throw new ValidationError("El apellido debe tener al menos 3 caracteres.", "lastName");
  }

  // Validación de email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Correo electrónico inválido.", "email");
  }

  // Validación de contraseñas
  if (password !== confirmPassword) {
    throw new ValidationError("Las contraseñas no coinciden.", "confirmPassword"); 
  }

  if (password.length < 8) {
    throw new ValidationError("La contraseña debe tener al menos 8 caracteres.", "password");
  }

  if (!/[A-Z]/.test(password)) {
    throw new ValidationError("La contraseña debe contener al menos una letra mayúscula.", "password");
  }

  if (!/[0-9]/.test(password)) {
    throw new ValidationError("La contraseña debe contener al menos un número.", "password");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new ValidationError("La contraseña debe contener al menos un carácter especial.", "password");
  }

  return await registerUserService(data);
}