import { getToken } from "store/authStore";
import { ValidationError } from "types/validatesError";


export const deleteCardById = async (boardId: number, listId: number, cardId: number) => {
  const token = getToken();

  if (!token) throw new ValidationError("No hay token de autenticación.", "general");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el tarjeta");
  }

  return res.json();
};

export const updateListCardById = async (boardId: number, listId: number, cardId: number, card: any) => {
  const token = getToken();

  if (!token) throw new ValidationError("No hay token de autenticación.", "general");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(card),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new ValidationError(responseData.message || "Error al actualizar la tarjeta", "general");
  }

  return responseData;
};
