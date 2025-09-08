import React, { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AddListModal from "./AddListButton";
import { useRouter } from "next/navigation";
import { useBoardLists } from "hooks/useBoardLists";
import { updateListService } from "../../services/updateListService";
import DeleteListButton from "./DeleteListButton";
// import draggable + droppable + overlay + types desde dragdrop
import DroppableList from "./dragdrop/DroppableList";
import DraggableTarjeta from "./dragdrop/DraggableTarjeta";
import DragOverlayCard from "./dragdrop/DragOverlayCard";
import { Card, List } from "./dragdrop/types";

const VistaListas: React.FC<{ boardId: string; isBoardOwner?: boolean; isBoardMember?: boolean }> = ({
  boardId,
  isBoardOwner = false,
  isBoardMember = false,
}) => {
  const { boardLists: originalLists, loading, error, getBoardLists } = useBoardLists(boardId);

  const [localLists, setLocalLists] = useState<List[]>([]);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [editandoListaId, setEditandoListaId] = useState<number | null>(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");

  useEffect(() => {
    if (originalLists && Array.isArray(originalLists)) {
      setLocalLists(originalLists);
    }
  }, [originalLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const cardIds = useMemo(() => {
    return localLists.flatMap((list) => list.cards.map((card) => card.id));
  }, [localLists]);

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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardId = Number(active.id);
    const draggedCard = localLists.flatMap((list) => list.cards).find((card) => card.id === cardId);
    setActiveCard(draggedCard || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = Number(active.id);
    const overId = over.id;

    // Si estamos sobre una lista droppable => cambiar localLists
    if (typeof overId === "string" && overId.startsWith("list-")) {
      const targetListId = Number(overId.replace("list-", ""));
      setLocalLists((currentLists) => {
        let activeCardLocal: Card | null = null;
        let sourceListId: number | null = null;

        for (const list of currentLists) {
          const cardIndex = list.cards.findIndex((card) => card.id === activeId);
          if (cardIndex >= 0) {
            activeCardLocal = list.cards[cardIndex];
            sourceListId = list.id;
            break;
          }
        }

        if (!activeCardLocal || sourceListId === null || sourceListId === targetListId) {
          return currentLists;
        }

        return currentLists.map((list) => {
          if (list.id === sourceListId) {
            return { ...list, cards: list.cards.filter((card) => card.id !== activeId) };
          } else if (list.id === targetListId) {
            return { ...list, cards: [...list.cards, activeCardLocal!] };
          }
          return list;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    // Aquí queda el lugar donde eventualmente haces el "back" (sync con backend).
    // No alteré tu comentario original.
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const router = useRouter();
  const goToAddTask = (listId: string | number) => {
    router.push(`/boardList/${boardId}/lists/${listId}/addtask`);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 bg-[#1a1a1a] overflow-x-auto scrollbar-custom w-full h-full">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {Array.isArray(localLists) && localLists.length > 0 ? (
            localLists.map((list) => (
              <DroppableList key={list.id} listId={list.id}>
                <div className="w-[280px] bg-[#222] rounded-lg p-3 flex flex-col flex-shrink-0">
                  {/* Encabezado */}
                  <div className="flex items-center px-3 py-1 rounded-t-md bg-neutral-600">
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
                          className="bg-transparent border-b border-white text-white font-semibold focus:outline-none w-full"
                          autoFocus
                        />
                      ) : (
                        <h2 className="text-white font-semibold truncate">{list.name}</h2>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-white">{list.cards.length}</span>
                      <img
                        src="/assets/icons/square-pen-white.svg"
                        alt="Editar lista"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => iniciarEdicion(list.id, list.name)}
                      />
                      <DeleteListButton boardId={boardId} list={list} getBoardLists={getBoardLists} isBoardOwner={isBoardOwner} />
                    </div>
                  </div>

                  {/* Lista de tareas */}
                  <div className="flex flex-col gap-3 bg-[#2b2b2b] p-2 rounded-b-md min-h-[612px]">
                    {list.cards.map((tarea) => (
                      <DraggableTarjeta
                        key={tarea.id}
                        card={tarea}
                        boardId={boardId}
                        listId={list.id.toString()}
                        isBoardOwner={isBoardOwner}
                        isBoardMember={isBoardMember}
                        getBoardLists={getBoardLists}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goToAddTask(list.id)}
                    className="mt-2 py-2 px-3 w-full bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    + Agregar tarea
                  </button>
                </div>
              </DroppableList>
            ))
          ) : (
            <p className="text-white mt-2"> No hay listas creadas en este tablero. </p>
          )}
        </SortableContext>

        {/* Botón agregar lista */}
        <div className="relative">
          <AddListModal boardId={boardId} getBoardLists={getBoardLists} />
        </div>
      </div>

      {/* Overlay para mostrar la tarjeta siendo arrastrada */}
      <DragOverlay>{activeCard ? <DragOverlayCard activeCard={activeCard} /> : null}</DragOverlay>
    </DndContext>
  );
};

export default VistaListas;
