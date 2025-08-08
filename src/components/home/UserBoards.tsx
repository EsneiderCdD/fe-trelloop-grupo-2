"use client";

import React, { useEffect, useState } from "react";
import { getUserBoards } from "../../services/boardService";
import { useRouter } from 'next/navigation';
import BoardMenu from "./BoardMenu";
import { toggleFavoriteBoard } from "../../services/boardService";

interface Board {
  id: string;
  name?: string;
  title?: string;
  description: string;
  board_image_url?: string;
  coverImage?: string;
  isFavorite?: boolean;
  members: { id: string; name: string; avatar: string }[];
  tags: string[];
}

const assignedImages = [
  "/assets/images/img4.jpg",
  "/assets/images/img2.jpg",
  "/assets/images/img3.jpg",
  "/assets/images/img1.jpg",
  "/assets/images/img5.jpg",
  "/assets/images/img6.jpg",
  "/assets/images/img7.jpg",
  "/assets/images/img8.jpg",
];

// Componente BoardPreview
interface BoardPreviewProps {
  board: Board;
  onClose: () => void;
  onToggleFavorite: (boardId: string) => void;
  onEnterBoard: (boardId: string) => void;
  menuVisible: string | null;
  setMenuVisible: React.Dispatch<React.SetStateAction<string | null>>;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({ 
  board, 
  onClose, 
  onToggleFavorite, 
  onEnterBoard,
  menuVisible,
  setMenuVisible
}) => {
  const isFavorite = board.isFavorite;

  return (
    <div 
      className="col-span-2 w-full h-[240px] rounded-[16px] bg-cover bg-center relative flex p-6"
      style={{ backgroundImage: `url(${board.coverImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[16px]"></div>
      
      {/* Contenido expandido */}
      <div className="relative z-10 flex w-full">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[18px] font-semibold text-white leading-tight max-w-[300px]">
              {board.name || board.title}
            </h3>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              onClick={() => onToggleFavorite(board.id)}
            >
              <img
                src={
                  isFavorite
                    ? "/assets/icons/heart-pink.svg"
                    : "/assets/icons/heart.png"
                }
                alt="Favorito"
                className={`object-contain ${
                  isFavorite ? "w-[20px] h-[20px]" : "w-[28px] h-[28px] scale-[1.15] -m-[2px]"
                }`}
              />
            </button>
          </div>

          {/* Descripción expandida */}
          <p className="text-[14px] font-normal text-white mb-6 leading-relaxed">
            {board.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
          </p>

          {/* Etiquetas */}
          <div className="flex flex-wrap gap-2 mb-4">
            {board.tags && board.tags.length > 0 ? (
              board.tags.map((tag, index) => (
                <div 
                  key={index}
                  className="flex items-center border border-[#979797] rounded-[16px] px-3 py-1"
                >
                  <img
                    src="/assets/icons/label.svg"
                    alt="Etiqueta"
                    className="w-[16px] h-[16px] mr-1"
                  />
                  <span className="text-[12px] font-medium text-white">{tag}</span>
                </div>
              ))
            ) : (
              ['Etiqueta', 'Etiqueta', 'Etiqueta', 'Etiqueta'].map((tag, index) => (
                <div 
                  key={index}
                  className="flex items-center border border-[#979797] rounded-[16px] px-3 py-1"
                >
                  <img
                    src="/assets/icons/label.svg"
                    alt="Etiqueta"
                    className="w-[16px] h-[16px] mr-1"
                  />
                  <span className="text-[12px] font-medium text-white">{tag}</span>
                </div>
              ))
            )}
          </div>

          {/* Controles inferiores */}
          <div className="mt-auto flex items-center gap-2 relative">
            <button
              className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-black"
              onClick={() => setMenuVisible(menuVisible === `preview-${board.id}` ? null : `preview-${board.id}`)}
            >
              <img
                src="/assets/icons/ellipsis.svg"
                alt="Opciones"
                className="w-4 h-4"
              />
            </button>

            {menuVisible === `preview-${board.id}` && (
              <BoardMenu
                boardId={board.id}
                onClose={() => setMenuVisible(null)}
              />
            )}

            <button 
              className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-black"
              onClick={onClose}
            >
              <img 
                src="/assets/icons/eye-closed.svg" 
                alt="Cerrar vista previa" 
                className="w-4 h-4" 
              />
            </button>

            <button 
              className="ml-auto flex items-center gap-2 bg-[#6a5fff] px-6 h-10 rounded-full hover:bg-[#5a4fff] transition-colors"
              onClick={() => onEnterBoard(board.id)}
            >
              <span className="text-white text-[14px] font-medium">Ingresar</span>
            </button>
          </div>
        </div>

        {/* Columna derecha - Miembros */}
        <div className="w-[200px] ml-8">
          <div className="bg-black bg-opacity-30 rounded-[12px] p-4">
            <h4 className="text-white text-[14px] font-semibold mb-4">Miembros</h4>
            <div className="space-y-3">
              {board.members.slice(0, 5).map((member, index) => (
                <div key={member.id || index} className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-white text-[12px] font-medium">{member.name}</p>
                    <p className="text-gray-300 text-[11px]">@usuario</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserBoards = () => {
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const router = useRouter();

  const [boards, setBoards] = useState<Board[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [initialBoardOrder, setInitialBoardOrder] = useState<string[]>([]);

  const [previewVisible, setPreviewVisible] = useState<string | null>(null);
  
  // 🆕 FUNCIÓN PARA TOGGLE
  const togglePreview = (boardId: string) => {
    setPreviewVisible(previewVisible === boardId ? null : boardId);
  };
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchBoards() {
      const userBoards = await getUserBoards();

      const loadedBoards: Board[] = userBoards.map((b: any, index: number) => ({
        id: b.id.toString(),
        name: b.name,
        title: b.name,
        description: b.description || "",
        board_image_url: b.boardImageUrl || "",
        coverImage: b.boardImageUrl || assignedImages[index] || "/assets/images/default-board.jpg",
        isFavorite: b.is_favorite ?? favoriteIds.has(b.id.toString()),
        members: Array.isArray(b.members)
          ? b.members.filter((m: any, i: number, self: any[]) =>
            self.findIndex((x) => (typeof x === "object" ? x.id : x) === (typeof m === "object" ? m.id : m)) === i
          ).map((m: any, i: number) => {
            const id = typeof m === "object" ? m.id : m;
            return {
              id: id.toString(),
              name: `Miembro ${i + 1}`,
              avatar: `/assets/icons/avatar${(i % 4) + 1}.png`,
            };
          })
          : [],
          tags: b.tags || [],
      }));

      setBoards(loadedBoards);

      if (userBoards.length > 0) {
        const newIds = userBoards.map((b: any) => b.id.toString());
        setInitialBoardOrder((prev) => {
          // Añadir cualquier ID nuevo sin alterar el orden actual
          const updatedOrder = [...prev];
          for (const id of newIds) {
            if (!updatedOrder.includes(id)) {
              updatedOrder.push(id); // lo agrega al final
            }
          }
          return updatedOrder;
        });
      }


      const favoriteSet = new Set(
        userBoards.filter((b: any) => b.is_favorite).map((b: any) => b.id.toString())
      );
      setFavoriteIds(favoriteSet as Set<string>);
    }

    // Ejecutar la primera vez
    fetchBoards();

    // 🔁 Auto-actualizar cada 3 segundos
    intervalId = setInterval(() => {
      fetchBoards();
    }, 3000);

    // Limpiar el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [Array.from(favoriteIds).sort().join(",")]);
  const toggleFavorite = async (boardId: string) => {
    const updated = new Set(favoriteIds);
    if (updated.has(boardId)) {
      updated.delete(boardId);
    } else {
      updated.add(boardId);
    }
    setFavoriteIds(updated);

    // Llamar al backend para persistir el cambio
    try {
      await toggleFavoriteBoard(boardId);
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
    }
  };

  const favoriteBoards = boards.filter((b) => favoriteIds.has(b.id));
  const createdBoards = initialBoardOrder.length > 0
    ? initialBoardOrder.map(id => boards.find(b => b.id === id)!).filter(Boolean)
    : boards;

  const goToBoardList = (boardId: string) => {
    router.push(`/boardList/${boardId}`);
  }

  // 🆕 FUNCIÓN PARA RENDERIZAR BOARD CARDS
  const renderBoardCard = (board: Board, sectionType: 'favorite' | 'created') => {
    const isFavorite = favoriteIds.has(board.id);
    const isPreviewActive = previewVisible === board.id;
    
    // Si esta card está en vista previa, renderizar componente expandido
    if (isPreviewActive) {
      return (
        <BoardPreview
          key={board.id}
          board={board}
          onClose={() => setPreviewVisible(null)}
          onToggleFavorite={toggleFavorite}
          onEnterBoard={goToBoardList}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
      );
    }

    // Card normal
    return (
      <div
        key={board.id}
        className="w-[250px] h-[240px] rounded-[16px] bg-cover bg-center relative flex flex-col justify-start p-4"
        style={{ backgroundImage: `url(${board.coverImage})` }}
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[14px] font-semibold text-white leading-tight">
            {board.name || board.title}
          </h3>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => toggleFavorite(board.id)}
          >
            <img
              src={
                isFavorite
                  ? "/assets/icons/heart-pink.svg"
                  : "/assets/icons/heart.png"
              }
              alt="Favorito"
              className={`object-contain ${
                isFavorite ? "w-[20px] h-[20px]" : "w-[28px] h-[28px] scale-[1.15] -m-[2px]"
              }`}
            />
          </button>
        </div>

        <p className="text-[12px] font-normal text-[#ccc] line-clamp-1 mb-2">
          {board.description}
        </p>

        <div className="flex space-x-[-8px] mb-3">
          {board.members.slice(0, 4).map((member, i) => (
            <img
              key={i}
              src={member.avatar}
              alt={member.name}
              className="w-6 h-6 rounded-full border border-black"
            />
          ))}
          {board.members.length > 4 && (
            <div className="w-6 h-6 rounded-full border border-[#979797] bg-[#272727] text-white text-[12px] font-medium flex items-center justify-center">
              +{board.members.length - 4}
            </div>
          )}
        </div>

        <div className="absolute bottom-6 left-4 right-4 flex items-center gap-2 justify-start">
          <div className="relative">
            <button
              className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-black"
              onClick={() => {
                const key = `${sectionType}-${board.id}`;
                setMenuVisible(menuVisible === key ? null : key);
              }}
            >
              <img
                src="/assets/icons/ellipsis.svg"
                alt="Opciones"
                className="w-4 h-4"
              />
            </button>

            {menuVisible === `${sectionType}-${board.id}` && (
              <BoardMenu
                boardId={board.id}
                onClose={() => setMenuVisible(null)}
              />
            )}
          </div>

          {/* 🆕 BOTÓN DE OJO ACTUALIZADO */}
          <button 
            className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-black"
            onClick={() => togglePreview(board.id)}
          >
            <img 
              src="/assets/icons/eye.svg" 
              alt="Vista previa" 
              className="w-4 h-4" 
            />
          </button>

          <button 
            className="ml-auto flex items-center gap-2 bg-[#161616] px-4 h-8 rounded-full"
            onClick={() => goToBoardList(board.id)}
          >
            <span className="text-white text-[12px] font-medium">Ingresar</span>
          </button>
        </div>

        <div className="absolute -bottom-10 left-0 flex items-center gap-2">
          <div className="flex items-center border border-[#979797] rounded-[16px] px-3 py-1">
            <img
              src="/assets/icons/label.svg"
              alt="Etiqueta"
              className="w-[18px] h-[18px] mr-1"
            />
            <span className="text-[12px] font-medium text-[#979797]">Etiqueta</span>
          </div>
          <div className="w-6 h-6 rounded-full border border-[#979797] bg-[#272727] text-white text-[12px] font-medium flex items-center justify-center">
            10
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] px-8 pt-2 pb-20 space-y-14 text-white font-poppins">
      <h1 className="text-[20px] font-medium text-white">Tablero</h1>

          {/* Favoritos */}
      {favoriteBoards.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-4 mt-4">
            <h2 className="text-white text-[14px] font-semibold">Favoritos</h2>
            <hr className="border-[#2B2B2B] flex-1" />
          </div>

          {/* 🆕 USANDO LA FUNCIÓN RENDER */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 mt-4">
            {favoriteBoards.map((board) => renderBoardCard(board, 'favorite'))}
          </div>
        </section>
      )}

      {/* Tableros creados */}
      <div className="flex items-center gap-4">
        <h2 className="text-white text-[14px] font-semibold">Tableros creados</h2>
        <hr className="border-[#2B2B2B] flex-1" />
      </div>

      {/* 🆕 USANDO LA FUNCIÓN RENDER */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-20 mt-4">
        {createdBoards.map((board) => renderBoardCard(board, 'created'))}
      </div>
    </div>
  );
};

export default UserBoards;