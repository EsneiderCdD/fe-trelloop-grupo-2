import { RegisterData } from "@/types/user";
import {registerUserService} from "@/services/authService";

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