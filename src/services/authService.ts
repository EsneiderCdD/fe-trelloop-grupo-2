import { RegisterData } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function registerUserService(data: RegisterData){
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    //Lanza un error con el mensaje del backend si existe
    throw new Error(resData?.error || "Error al registrar usuario");
  }

  return resData;
};



