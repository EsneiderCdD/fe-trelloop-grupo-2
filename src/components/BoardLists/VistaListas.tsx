import React from "react";
import AddListModal from "./AddListButton";
import { useBoardLists } from "hooks/useBoardLists";

interface Tarea {
  board_id: number;
  id: number;
  etiquetas: string;
  descripcion: string;
  personas: number;
  comentarios: number;
}

const VistaListas: React.FC<{ boardId: string }> = ({ boardId }) => {
  const { boardLists, loading, error, getBoardLists } = useBoardLists(boardId);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex gap-4 p-4 bg-[#1a1a1a] h-full">
      {Array.isArray(boardLists) &&
        boardLists.length > 0 &&
        boardLists.map((list) => (
          <div key={list.id} className="flex flex-col w-64">
            {/* Encabezado */}
            <div
              className={`flex justify-between items-center px-3 py-2 rounded-t-md `}
            >
              <h2 className="text-white font-semibold">{list.name}</h2>
              {/* <span className="text-white">{list.tareas.length}</span> */}
            </div>

            {/* Lista de tareas */}
            <div className="flex flex-col gap-3 bg-[#2b2b2b] p-3 rounded-b-md flex-1">
              {list.cards.map((tarea) => (
                <div
                  key={tarea.id}
                  className={`bg-[#3a3a3a] rounded-md p-3 border-l-4 `}
                >
                  <div className="text-gray-400 text-sm mb-2">
                    {tarea.etiquetas}
                  </div>
                  <div className="text-white text-sm mb-2">
                    {tarea.descripcion}
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>👥 {tarea.personas}</span>
                    <span>💬 {tarea.comentarios}</span>
                  </div>
                </div>
              ))}

              {/* Botón agregar tarea */}
              <button className="mt-2 py-2 px-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                + Agregar tarea
              </button>
            </div>
          </div>
        ))}
      <div className="relative">
        <AddListModal boardId={boardId} getBoardLists={getBoardLists} />
      </div>
      {(!Array.isArray(boardLists) || boardLists.length === 0) && (
      <p className="text-white mt-2">
        No hay listas creadas en este tablero.
      </p>
    )}
    </div>
  );
};

export default VistaListas;
