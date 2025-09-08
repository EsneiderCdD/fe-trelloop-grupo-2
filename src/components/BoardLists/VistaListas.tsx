import React, { useState, useMemo } from "react";
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
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddListModal from "./AddListButton";
import { useRouter } from "next/navigation";
import { useBoardLists } from "hooks/useBoardLists";
import { updateListService } from "../../services/updateListService";
import DeleteListButton from "./DeleteListButton";
import DraggableTarjeta from "./DraggableTarjeta"; // Nuevo componente
import DroppableList from "./DroppableList"; // Nuevo componente

interface Card {
  id: number;
  title: string;
  description?: string;
  tags?: Array<{ name: string }>;
  assignees?: Array<{ avatar_url: string; name: string }>;
  priority?: string;
}

interface List {
  id: number;
  name: string;
  cards: Card[];
}

const VistaListas: React.FC<{ 
  boardId: string; 
  isBoardOwner?: boolean; 
  isBoardMember?: boolean 
}> = ({
  boardId,
  isBoardOwner = false,
  isBoardMember = false,
}) => {
  const { boardLists: originalLists, loading, error, getBoardLists } = useBoardLists(boardId);
  
  // Estado local para manejar las listas con drag and drop
  const [localLists, setLocalLists] = useState<List[]>([]);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  
  const [editandoListaId, setEditandoListaId] = useState<number | null>(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");

  // Actualizar el estado local cuando cambien las listas originales
  React.useEffect(() => {
    if (originalLists && Array.isArray(originalLists)) {
      setLocalLists(originalLists);
    }
  }, [originalLists]);

  // Configurar sensores para el drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Evita conflictos con clicks
      },
    })
  );

  // Obtener todos los IDs de las tarjetas para el contexto sortable
  const cardIds = useMemo(() => {
    return localLists.flatMap(list => list.cards.map(card => card.id));
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
    
    // Encontrar la tarjeta que se está arrastrando
    const draggedCard = localLists
      .flatMap(list => list.cards)
      .find(card => card.id === cardId);
    
    setActiveCard(draggedCard || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const overId = over.id;

    // Verificar si estamos moviendo sobre una lista (droppable)
    if (typeof overId === 'string' && overId.startsWith('list-')) {
      const targetListId = Number(overId.replace('list-', ''));
      
      setLocalLists(currentLists => {
        // Encontrar la tarjeta activa y su lista actual
        let activeCard: Card | null = null;
        let sourceListId: number | null = null;

        for (const list of currentLists) {
          const cardIndex = list.cards.findIndex(card => card.id === activeId);
          if (cardIndex >= 0) {
            activeCard = list.cards[cardIndex];
            sourceListId = list.id;
            break;
          }
        }

        if (!activeCard || sourceListId === null || sourceListId === targetListId) {
          return currentLists;
        }

        // Crear nueva estructura
        return currentLists.map(list => {
          if (list.id === sourceListId) {
            // Remover la tarjeta de la lista origen
            return {
              ...list,
              cards: list.cards.filter(card => card.id !== activeId)
            };
          } else if (list.id === targetListId) {
            // Agregar la tarjeta a la lista destino
            return {
              ...list,
              cards: [...list.cards, activeCard]
            };
          }
          return list;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    
    //--------------->> AQUI SE PUEDE AGREGAR EL BACK <<-------------------
    
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
                        <h2 className="text-white font-semibold truncate">
                          {list.name}
                        </h2>
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
                  <div className="flex flex-col gap-3 bg-[#2b2b2b] p-2 rounded-b-md  min-h-[612px]">
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
            <p className="text-white mt-2">
              No hay listas creadas en este tablero.
            </p>
          )}
        </SortableContext>

        {/* Botón agregar lista */}
        <div className="relative">
          <AddListModal boardId={boardId} getBoardLists={getBoardLists} />
        </div>
      </div>

      {/* Overlay para mostrar la tarjeta siendo arrastrada */}
      <DragOverlay>
        {activeCard ? (
          <div className="transform rotate-5 opacity-90">
            <div className="relative bg-[#3a3a3a] w-[240px] h-[101px] rounded-md p-1 border-l-4 border-purple-600 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <div className="flex gap-1 flex-wrap">
                  {activeCard.tags?.slice(0, 2).map((tag, idx) => (
                    <div
                      key={idx}
                      className="rounded-[16px] bg-[#414141] text-[#E5E7EB] text-[11px] font-poppins px-3 py-0.5 w-fit"
                    >
                      {tag.name.length > 25 ? tag.name.slice(0, 22) + "..." : tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-1 text-[13px] font-poppins text-[#E5E7EB]">
                {activeCard.title}
              </div>
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <div className="flex -space-x-2">
                  {activeCard.assignees?.slice(0, 2).map((user, idx) => (
                    <img
                      key={idx}
                      src={user.avatar_url}
                      alt={user.name}
                      className="w-6 h-6 rounded-full border-[0.5px] border-black"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default VistaListas;