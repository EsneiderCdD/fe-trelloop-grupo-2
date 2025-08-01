import { CreateBoardPayload } from "../types/board";
import { ValidationError } from "../types/validatesError";
import { createBoardService } from "../services/boardService";
// import { createBoard } from "services/boardService";

export async function createBoardController(data: CreateBoardPayload): Promise<void> {
  if (!data.name || data.name.trim().length < 3) {
    throw new ValidationError("El nombre del tablero es obligatorio y debe tener al menos 3 caracteres.", "name");
  }

  return await createBoardService(data);
}

