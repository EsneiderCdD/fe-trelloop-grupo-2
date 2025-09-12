"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import DeleteCardButton from "../DeleteCardButton";
import { Card } from "./types";
import Portal from "../Portal";

interface DraggableTarjetaProps {
  card: Card;
  boardId: string;
  listId: string | number;
  isBoardOwner?: boolean;
  isBoardMember?: boolean;
  getBoardLists: () => Promise<void>;
}

const DraggableTarjeta: React.FC<DraggableTarjetaProps> = ({
  card,
  boardId,
  listId,
  isBoardOwner = false,
  isBoardMember = false,
  getBoardLists,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: card.id,
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const getPriorityColor = (prioridad?: string) => {
    switch (prioridad?.toLowerCase()) {
      case "alta":
        return "border-[#A70000]";
      case "media":
        return "border-[#DF8200]";
      case "baja":
        return "border-[#667085]";
      default:
        return "border-purple-600";
    }
  };

  const getVisibleTags = (tags?: Array<{ name: string }>) => {
    if (!tags) return [];
    const maxChars = 45;
    const maxTags = 2;
    let total = 0;
    const visibles: string[] = [];
    for (const tag of tags) {
      if (visibles.length >= maxTags) break;
      const lengthWithSpace = tag.name.length + (visibles.length > 0 ? 1 : 0);
      if (total + lengthWithSpace <= maxChars) {
        visibles.push(tag.name);
        total += lengthWithSpace;
      } else {
        break;
      }
    }
    return visibles;
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const { deleteCardById } = await import("services/cardService");
      await deleteCardById(Number(boardId), Number(listId), card.id);
      setShowDeleteModal(false);
      await getBoardLists();
    } catch (err: any) {
      console.error("Error al eliminar tarjeta:", err);
      alert(err?.message || "Error al eliminar la tarjeta");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom - 5,
        left: rect.left + 14,     
      });
    }
    setShowMenu(!showMenu);
  };

  const editURL = `/boardList/${boardId}/lists/${listId}/cards/${card.id}`;

  const classNames = `relative bg-[#3a3a3a] w-[240px] h-[101px] rounded-md p-1 border-l-4 flex flex-col justify-between cursor-grab active:cursor-grabbing ${getPriorityColor(
    card.priority
  )} ${isDragging ? "z-50" : ""}`;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={classNames}
      >
        {/* Fila superior: etiquetas + menú */}
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {getVisibleTags(card.tags).map((tag, idx) => (
              <div
                key={idx}
                className="rounded-[16px] bg-[#414141] text-[#E5E7EB] text-[11px] font-poppins px-3 py-0.5 w-fit"
              >
                {tag.length > 25 ? tag.slice(0, 22) + "..." : tag}
              </div>
            ))}
          </div>

          <button ref={buttonRef} onClick={handleMenuClick}>
            <img
              src="/assets/icons/ellipsis.svg"
              alt="Opciones"
              className="w-6 h-6 transform rotate-90"
            />
          </button>
        </div>

        {/* Título con máximo 2 líneas */}
        <div
          className="ml-1 text-[13px] font-poppins text-[#E5E7EB]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {card.title}
        </div>

        {/* Fila inferior: avatars + comentarios */}
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <div className="flex -space-x-2">
            {card.assignees && card.assignees.length <= 2 ? (
              card.assignees.map((user, idx) => (
                <img
                  key={idx}
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-6 h-6 rounded-full border-[0.5px] border-black"
                />
              ))
            ) : card.assignees && card.assignees.length > 2 ? (
              <>
                {card.assignees.slice(0, 2).map((user, idx) => (
                  <img
                    key={idx}
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border-[0.5px] border-black"
                  />
                ))}
                <div className="w-6 h-6 flex items-center justify-center rounded-full border-[0.5px] border-gray-400 bg-[#3a3a3a] text-white text-xs leading-none font-medium">
                  {card.assignees.length}
                </div>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-white mr-1 text-sm">0</span>
            <img src="/assets/icons/workflow.svg" alt="Comentarios" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Menú contextual en Portal */}
      {showMenu && menuPosition && (
        <Portal>
          <div
            ref={menuRef}
            className="fixed z-[9999] w-[223px] h-[150px] rounded-md bg-[#272727] shadow-lg p-4 flex flex-col gap-2 animate-fade-in"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            <button className="flex items-center gap-2 w-full h-[37px] px-4 rounded-md hover:bg-[#3A3A3A]">
              <img src="/assets/icons/eyes.svg" alt="Ver" className="w-5 h-5" />
              <span className="text-white text-sm font-medium">Ver tarjeta</span>
            </button>

            <button
              onClick={() => router.push(editURL)}
              className="flex items-center gap-2 w-full h-[37px] px-4 rounded-md hover:bg-[#3A3A3A]"
            >
              <img src="/assets/icons/edit.png" alt="Editar" className="w-4 h-4" />
              <span className="text-white text-sm font-medium">Editar tarjeta</span>
            </button>

            <DeleteCardButton
              boardId={boardId}
              listId={String(listId)}
              card={card}
              isBoardOwner={isBoardOwner}
              isBoardMember={isBoardMember}
              getBoardLists={getBoardLists}
              onMenuClose={() => setShowMenu(false)}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </Portal>
      )}

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60" style={{ zIndex: 10000 }}>
          <div className="w-[460px] h-[274px] bg-[#222222] rounded-[16px] flex flex-col items-center px-6 py-4 relative">
            <img src="/assets/icons/alert.png" alt="Alerta" className="w-[72px] h-[72px] mt-2" />
            <p className="text-white text-center font-poppins text-[14px] font-normal leading-[180%] mt-6">
              ¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no será reversible.
            </p>
            <div className="flex justify-between mt-auto mb-4 gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="w-[180px] h-[32px] border border-[#6A5FFF] rounded-[8px] text-white text-[14px] font-normal leading-[117%] hover:opacity-90 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="w-[180px] h-[32px] bg-[#FB7A7A] rounded-[8px] text-white text-[14px] font-medium leading-[117%] hover:opacity-90 disabled:opacity-60"
              >
                {isDeleting ? "Eliminando..." : "Eliminar tarjeta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DraggableTarjeta;
