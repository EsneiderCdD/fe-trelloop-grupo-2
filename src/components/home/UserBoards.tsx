"use client";

import React from "react";
import { mockBoards } from "../../services/mockBoards";

interface Board {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  isFavorite: boolean;
  members: { id: string; name: string; avatar: string }[];
  tags: string[];
}

const UserBoards = () => {
  const favoriteBoard = mockBoards.find((b) => b.isFavorite);
  const createdBoards = mockBoards.filter((b) => !b.isFavorite);

  return (
    <div className="min-h-screen bg-[#1A1A1A] px-8 py-16 space-y-20 text-white font-poppins">
      {/* Favoritos */}
      {favoriteBoard && (
        <section>
          <h2 className="text-white text-lg font-semibold mb-4">Favoritos</h2>
          <div className="w-[250px] h-[240px] rounded-[16px] bg-cover bg-center relative flex flex-col justify-between p-4"
            style={{ backgroundImage: `url(${favoriteBoard.coverImage})` }}
          >
            <div className="flex justify-end">
              <div className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center">
                <img src="/assets/icons/heart.svg" alt="Favorito" className="w-5 h-5" />
              </div>
            </div>

            <div className="text-white">
              <h3 className="text-[16px] font-medium leading-none mb-1">
                Ut enim ad minim
              </h3>
              <p className="text-[14px] font-normal text-[#ccc] line-clamp-1">
                {favoriteBoard.description || "Duis aute irure dolor in repre..."}
              </p>

              <div className="flex mt-4 space-x-[-8px]">
                {favoriteBoard.members.map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    className="w-6 h-6 rounded-full border border-white"
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <button className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-white">
                <img src="/assets/icons/eye.svg" alt="Ver" className="w-4 h-4" />
              </button>

              <button className="flex items-center gap-2 bg-[#161616] px-4 h-8 rounded-full">
                <span className="text-white text-[12px] font-medium">Ingresar</span>
              </button>
            </div>

            <div className="absolute -bottom-6 left-0 flex items-center gap-2">
              <div className="flex items-center border border-[#979797] rounded-[16px] px-3 py-1">
                <img src="/assets/icons/label.svg" alt="Etiqueta" className="w-[18px] h-[18px] mr-1" />
                <span className="text-[12px] font-medium text-[#979797]">Etiqueta</span>
              </div>
              <div className="w-6 h-6 rounded-full border border-[#979797] bg-[#272727] text-white text-[12px] font-medium flex items-center justify-center">
                10
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tableros Creados */}
      <section>
        <h2 className="text-white text-lg font-semibold mb-4">Tableros creados</h2>
        <div className="flex flex-wrap gap-6 mt-6">
          {createdBoards.map((board, index) => (
            <div
                key={board.id}
                className="w-[250px] h-[240px] rounded-[16px] bg-cover bg-center relative flex flex-col justify-between p-4 mb-8 mr-4"
                style={{ backgroundImage: `url(${board.coverImage || "/assets/images/default-board.jpg"})` }}
                >
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center">
                  <img src="/assets/icons/heart.svg" alt="Favorito" className="w-5 h-5" />
                </div>
              </div>

              <div className="text-white">
                <h3 className="text-[16px] font-medium leading-none mb-1">
                  Título tablero
                </h3>
                <p className="text-[14px] font-normal text-[#ccc] line-clamp-1">
                  {board.description || "Duis aute irure dolor in repre..."}
                </p>

                <div className="flex mt-4 space-x-[-8px]">
                  {board.members.map((member) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      className="w-6 h-6 rounded-full border border-white"
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <button className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center border border-white">
                  <img src="/assets/icons/eye.svg" alt="Ver" className="w-4 h-4" />
                </button>

                <button className="flex items-center gap-2 bg-[#161616] px-4 h-8 rounded-full">
                  <span className="text-white text-[12px] font-medium">Ingresar</span>
                </button>
              </div>

              <div className="absolute -bottom-6 left-0 flex items-center gap-2">
                <div className="flex items-center border border-[#979797] rounded-[16px] px-3 py-1">
                  <img src="/assets/icons/label.svg" alt="Etiqueta" className="w-[18px] h-[18px] mr-1" />
                  <span className="text-[12px] font-medium text-[#979797]">Etiqueta</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-[#979797] bg-[#272727] text-white text-[12px] font-medium flex items-center justify-center">
                  10
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserBoards;