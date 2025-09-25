"use client";

import React, { useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { Card } from "./types";
import CardMenu from "./CardMenu";
import DeleteCardModal from "./DeleteCardModal";
import { getPriorityColor, getVisibleTags } from "./cardUtils";
import { truncateDate, formatToDDMMYYYY } from "../../../utils/dates";

interface Props {
  card: Card;
  boardId: string;
  listId: string | number;
  isBoardOwner?: boolean;
  isBoardMember?: boolean;
  getBoardLists: () => Promise<void>;
}

const DraggableTarjeta: React.FC<Props> = ({
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
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
      setMenuPosition({ top: rect.bottom - 5, left: rect.left + 14 });
    }
    setShowMenu(!showMenu);
  };

  // ====== Normalización de fechas ======
  const rawEndDate = (card as any).end_date || card.endDate || null;
  const endDate = rawEndDate ? truncateDate(new Date(`${rawEndDate}T00:00:00`)) : null;

  const ahoraArgentina = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
  );
  const hoyArgentina = truncateDate(ahoraArgentina);
  const isOverdue = endDate ? endDate < hoyArgentina : false;
  // =====================================

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative bg-[#3a3a3a] w-[250px] min-h-[101px] rounded-md p-1 border-l-4 flex flex-col justify-between cursor-grab active:cursor-grabbing ${getPriorityColor(
          card.priority
        )} ${isDragging ? "z-50" : ""}`}
      >
        {/* Fila superior */}
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

        {/* Título */}
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

        {/* Avatars + fecha + comentarios */}
        <div className="flex justify-between items-center text-gray-400 text-sm">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {card.assignees && card.assignees.length <= 2
              ? card.assignees.map((user, idx) => (
                  <img
                    key={idx}
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border-[0.5px] border-black"
                  />
                ))
              : card.assignees && card.assignees.length > 2 && (
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
                )}
          </div>

          {/* Fecha */}
          {endDate && (
            <div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isOverdue ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-700"
                }`}
              >
                {formatToDDMMYYYY(endDate)}
              </span>
            </div>
          )}

          {/* Comentarios */}
          <div className="flex items-center gap-1">
            <span className="text-white mr-1 text-sm">0</span>
            <img src="/assets/icons/workflow.svg" alt="Comentarios" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {showMenu && menuPosition && (
        <CardMenu
          card={card}
          boardId={boardId}
          listId={listId}
          isBoardOwner={isBoardOwner}
          isBoardMember={isBoardMember}
          getBoardLists={getBoardLists}
          onClose={() => setShowMenu(false)}
          onDeleteClick={handleDeleteClick}
          position={menuPosition}
        />
      )}

      {showDeleteModal && (
        <DeleteCardModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default DraggableTarjeta;
