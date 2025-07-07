import { RegisterData } from "@/types/user";
import {registerUserService} from "@/services/authService";

export async function registerUserController(data: RegisterData) {
  const { firstName, lastName, email, password, confirmPassword } = data;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error("Todos los campos son obligatorios.");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Correo electrónico inválido.");
  }

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  return await registerUserService(data);
}