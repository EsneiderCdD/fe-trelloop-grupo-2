"use client";

import React, { useState, useEffect } from "react";
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
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import AddListModal from "./AddListButton";
import { useRouter } from "next/navigation";
import { useBoardLists } from "hooks/useBoardLists";
import { updateListService } from "../../services/updateListService";
import DeleteListButton from "./DeleteListButton";
import DroppableList from "./dragdrop/DroppableList";
import DraggableTarjeta from "./dragdrop/DraggableTarjeta";
// import DragOverlayCard from "./dragdrop/DragOverlayCard";
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

  /**
   * Inicializa / sincroniza localLists desde originalLists
   * SOLO actualiza cuando hay una diferencia real para evitar re-renders infinitos.
   */
  useEffect(() => {
    if (!originalLists || !Array.isArray(originalLists)) return;

    setLocalLists((prev) => {
      if (prev.length === 0) return originalLists;

      const same =
        prev.length === originalLists.length &&
        prev.every((pl, idx) => {
          const ol = originalLists[idx];
          if (!ol) return false;
          return pl.id === ol.id && pl.cards.length === ol.cards.length;
        });

      return same ? prev : originalLists;
    });
   
  }, [originalLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

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
    const cardId = typeof active.id === "string" ? Number(active.id) : (active.id as number);
    const draggedCard = localLists.flatMap((list) => list.cards).find((card) => card.id === cardId);
    setActiveCard(draggedCard || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = typeof active.id === "string" ? Number(active.id) : (active.id as number);
    const overIdRaw = over.id;

    // Caso: está sobre la "zona" de la lista -> mover al final
    if (typeof overIdRaw === "string" && overIdRaw.startsWith("list-")) {
      const targetListId = Number(overIdRaw.replace("list-", ""));
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

        if (!activeCardLocal || sourceListId === null) {
          return currentLists;
        }

        if (sourceListId === targetListId) return currentLists;

        return currentLists.map((list) => {
          if (list.id === sourceListId) {
            return { ...list, cards: list.cards.filter((card) => card.id !== activeId) };
          } else if (list.id === targetListId) {
            return { ...list, cards: [...list.cards, activeCardLocal!] };
          }
          return list;
        });
      });

      return;
    }

    // Caso: está sobre otra tarjeta
    const overId = typeof overIdRaw === "string" ? Number(overIdRaw) : (overIdRaw as number);
    if (isNaN(overId)) return;

    setLocalLists((currentLists) => {
      let sourceListId: number | null = null;
      let sourceIndex = -1;
      let overListId: number | null = null;
      let overIndex = -1;
      let activeCardLocal: Card | null = null;

      for (const list of currentLists) {
        const idxActive = list.cards.findIndex((c) => c.id === activeId);
        if (idxActive >= 0) {
          sourceListId = list.id;
          sourceIndex = idxActive;
          activeCardLocal = list.cards[idxActive];
        }

        const idxOver = list.cards.findIndex((c) => c.id === overId);
        if (idxOver >= 0) {
          overListId = list.id;
          overIndex = idxOver;
        }

        if (sourceListId !== null && overListId !== null) break;
      }

      if (!activeCardLocal || sourceListId === null || overListId === null) return currentLists;

      // Reorden dentro de la misma lista
      if (sourceListId === overListId) {
        if (sourceIndex === overIndex) return currentLists;
        return currentLists.map((list) => {
          if (list.id !== sourceListId) return list;
          return { ...list, cards: arrayMove(list.cards, sourceIndex, overIndex) };
        });
      }

      // Mover entre listas distintas
      return currentLists.map((list) => {
        if (list.id === sourceListId) {
          return { ...list, cards: list.cards.filter((c) => c.id !== activeId) };
        }
        if (list.id === overListId) {
          const newCards = [...list.cards];
          let insertIndex = overIndex;
          if (overIndex === list.cards.length - 1) {
            insertIndex = list.cards.length;
          }
          newCards.splice(insertIndex, 0, activeCardLocal!);
          return { ...list, cards: newCards };
        }
        return list;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
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
      <div className="flex gap-4 p-4 pt-1 bg-[#1a1a1a] overflow-x-auto scrollbar-custom w-full h-full">
        {Array.isArray(localLists) && localLists.length > 0 ? (
          localLists.map((list) => (
            <DroppableList key={list.id} listId={list.id}>
              <div className="w-[280px] bg-[#222] rounded-lg p-2  pt-0 flex flex-col flex-shrink-0">
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
                    <DeleteListButton
                      boardId={boardId}
                      list={list}
                      getBoardLists={getBoardLists}
                      isBoardOwner={isBoardOwner}
                    />
                  </div>
                </div>

                {/* Lista de tareas */}
                <SortableContext items={list.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                  <div
                    className="flex flex-col gap-3 bg-[#2b2b2b] p-1 rounded-b-md 
                  min-h-[450px] max-h-[450px] 
                  overflow-y-auto overflow-x-hidden scrollbar-custom"
                  >
                    {list.cards.length > 0 ? (
                      list.cards.map((tarea) => (
                        <DraggableTarjeta
                          key={tarea.id}
                          card={tarea}
                          boardId={boardId}
                          listId={list.id.toString()}
                          isBoardOwner={isBoardOwner}
                          isBoardMember={isBoardMember}
                          getBoardLists={getBoardLists}
                        />
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm"></div>
                    )}
                  </div>
                </SortableContext>

                <button
                  onClick={() => goToAddTask(list.id)}
                  className="mt-2 py-2 px-3 w-full bg-[#6A5FFF] text-white rounded-xl"
                >
                  + Agregar tarea
                </button>
              </div>
            </DroppableList>
          ))
        ) : (
          <p className="text-white mt-2"> No hay listas creadas en este tablero. </p>
        )}

        {/* Botón agregar lista */}
        <div className="relative">
          <AddListModal boardId={boardId} getBoardLists={getBoardLists} />
        </div>
      </div>

      {/* Overlay para mostrar la tarjeta siendo arrastrada */}
      <DragOverlay>
        {activeCard ? (
          <DraggableTarjeta
            card={activeCard}
            boardId={boardId}
            listId={"overlay"} // valor dummy
            isBoardOwner={isBoardOwner}
            isBoardMember={isBoardMember}
            getBoardLists={getBoardLists}
            // isOverlay={true}
          />
        ) : null}
      </DragOverlay>

    </DndContext>
  );
};

export default VistaListas;
