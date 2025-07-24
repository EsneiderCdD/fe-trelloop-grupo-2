import { RegisterData } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUserService(data: RegisterData){
  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    //Lanza un error con el mensaje del backend si existe
    throw new Error(resData?.error || resData?.message || "Error al registrar usuario");
  }

  return resData;
};



