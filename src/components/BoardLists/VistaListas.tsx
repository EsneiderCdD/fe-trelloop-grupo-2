import React, { useState } from "react";
import AddListModal from "./AddListButton";
import { useRouter } from "next/navigation";
import { useBoardLists } from "hooks/useBoardLists";
import { updateListService } from "../../services/updateListService";
import DeleteListButton from "./DeleteListButton";
import Tarjeta from "./Tarjetas";

const PALETTE = [
  "#2E90FA",
  "#12B76A",
  "#F59E0B",
  "#A855F7",
  "#EF4444",
  "#06B6D4",
  "#F97316",
  "#22C55E",
  "#EAB308",
  "#DB2777",
];

const hashIndex = (str: string, mod: number) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % mod;
};

const contrastText = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#111" : "#fff";
};

const VistaListas: React.FC<{ boardId: string; isBoardOwner?: boolean; isBoardMember?: boolean }> = ({
  boardId,
  isBoardOwner = false,
  isBoardMember = false,
}) => {
  const { boardLists, loading, error, getBoardLists } = useBoardLists(boardId);

  const [editandoListaId, setEditandoListaId] = useState<number | null>(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");

  const iniciarEdicion = (listId: number, nombreActual: string) => {
    setEditandoListaId(listId);
    setNuevoTitulo(nombreActual);
  };

  const guardarTitulo = async (listId: number) => {
    if (!nuevoTitulo.trim()) return;
    try {
      await updateListService(Number(boardId), listId, nuevoTitulo);
      setEditandoListaId(null);
      getBoardLists();
    } catch (err) {
      console.error("Error actualizando lista", err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const router = useRouter();

  const goToAddTask = (listId: string | number) => {
    router.push(`/boardList/${boardId}/lists/${listId}/addtask`);
  };

  return (
    <div className="flex gap-4 p-4 bg-[#1a1a1a] overflow-x-auto scrollbar-custom w-full h-full">
      {Array.isArray(boardLists) && boardLists.length > 0 ? (
        boardLists.map((list) => {
          const listBg = list && list.name ? PALETTE[hashIndex(String(list.name), PALETTE.length)] : "#2B2B2B";
          const listText = contrastText(listBg);

          return (
            <div
              key={list.id}
              className="w-[280px] bg-[#222] rounded-lg p-0 flex flex-col h-full flex-shrink-0"
            >
              {/* Franja de título de la lista */}
              <div
                className="flex items-center justify-between rounded-[4px] px-2"
                style={{
                  backgroundColor: listBg,
                  width: "100%",
                  height: "24px",
                  margin: "2px",
                  opacity: 1,
                  gap: "12px",
                }}
              >
                {/* Título lista */}
                <div className="flex-1 min-w-0">
                  {editandoListaId === list.id ? (
                    <input
                      type="text"
                      value={nuevoTitulo}
                      onChange={(e) => setNuevoTitulo(e.target.value)}
                      onBlur={() => guardarTitulo(list.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") guardarTitulo(list.id);
                        if (e.key === "Escape") setEditandoListaId(null);
                      }}
                      className="bg-transparent border-b border-white focus:outline-none w-full"
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                      autoFocus
                    />
                  ) : (
                    <h2
                      className="truncate"
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "24px",
                        opacity: 1,
                      }}
                      title={list.name}
                    >
                      {list.name}
                    </h2>
                  )}
                </div>

                {/* Número de tarjetas + íconos */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      width: "15px",
                      height: "16px",
                      opacity: 1,
                    }}
                  >
                    {list.cards.length}
                  </span>
                  <img
                    src="/assets/icons/square-pen-white.svg"
                    alt="Editar lista"
                    className="w-4 h-4 cursor-pointer rounded-sm"
                    onClick={() => iniciarEdicion(list.id, list.name)}
                    
                  />
                  <DeleteListButton
                    boardId={boardId}
                    list={list}
                    getBoardLists={getBoardLists}
                    isBoardOwner={isBoardOwner}
                  />
                </div>
              </div>

              {/* Lista de tarjetas */}
              <div className="flex flex-col gap-3 bg-[#2b2b2b] p-2 rounded-b-md flex-1">
                {list.cards.map((tarea) => (
                  <Tarjeta
                    key={tarea.id}
                    descripcion={tarea.title}
                    editURL={`/boardList/${boardId}/lists/${list.id}/cards/${tarea.id}`}
                    etiquetas={
                      tarea.tags && tarea.tags.length > 0
                        ? tarea.tags.map((tag: any) => tag.name)
                        : []
                    }
                    assignees={tarea.assignees || []}
                    comentarios={0}
                    prioridad={tarea.priority}
                    boardId={boardId}
                    listId={list.id.toString()}
                    card={{
                      id: tarea.id,
                      title: tarea.title,
                      description: tarea.description,
                      endDate: tarea.end_date,
                    }}
                    isBoardOwner={isBoardOwner}
                    isBoardMember={isBoardMember}
                    getBoardLists={getBoardLists}
                  />
                ))}
              </div>

              <button
                onClick={() => goToAddTask(list.id)}
                className="mt-2 py-2 px-3 w-full bg-purple-600 text-white rounded-b-md hover:bg-purple-700"
              >
                + Agregar tarea
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-white mt-2">
          No hay listas creadas en este tablero.
        </p>
      )}

      {/* Botón agregar lista */}
      <div className="relative">
        <AddListModal boardId={boardId} getBoardLists={getBoardLists} />
      </div>
    </div>
  );
};

export default VistaListas;