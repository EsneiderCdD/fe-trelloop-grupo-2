import { authController } from "controllers/authController";
import { ValidationError } from "types/validatesError";

export const getListsService = async (boardId: number) => {
  const token = authController.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    throw new ValidationError("No hay token de autenticación.", "general");
  }

  if (!apiUrl) {
    throw new ValidationError("No se ha definido la URL de la API.", "general");
  }

  const response = await fetch(`${apiUrl}/api/boards/${boardId}/lists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new ValidationError(
      responseData.message || "Error al obtener las listas",
      "general"
    );
  }

  return responseData;
};
