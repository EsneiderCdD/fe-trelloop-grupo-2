"use client";
import { useState } from "react";
import Image from "next/image";
import { BoardInfoProps } from "../types";

const DEFAULT_IMAGE_URL =
  "https://res.cloudinary.com/djw3lkdam/image/upload/v1754147240/samples/cloudinary-icon.png";

export default function BoardInfo({
  name,
  description,
  imageUrl,
  onNameChange,
  onDescriptionChange,
  onImageUrlChange,
}: BoardInfoProps) {
  const [showInput, setShowInput] = useState(false);

  const safeImageUrl = imageUrl?.trim() ? imageUrl : DEFAULT_IMAGE_URL;

  return (
    <div className="text-white space-y-2">
      {/* Imagen centrada arriba */}
      <div className="flex justify-start">
        {/* Imagen del tablero */}
        <div className="relative">
          <div
            className="cursor-pointer group"
            onClick={() => setShowInput(!showInput)}
          >
            <div className="w-[130px] h-[130px] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#6A5FFF] transition-all duration-300 relative">
              <Image
                src={safeImageUrl}
                alt="Imagen del tablero"
                width={130}
                height={130}
                className="w-full h-full object-cover"
              />
              {/* Icono de edición superpuesto */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-200">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input para URL de imagen */}
          {showInput && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[300px] bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl p-4 shadow-lg z-10">
              <label className="text-white text-sm font-medium block mb-2">
                Agrega URL de{" "}
                <a
                  href="https://cloudinary.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6a5fff] underline hover:text-[#5a4fff] transition-colors"
                >
                  Cloudinary
                </a>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => onImageUrlChange(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 h-[36px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-lg px-3 border border-[#3c3c3c] outline-none focus:ring-1 focus:ring-[#6a5fff] focus:border-transparent transition-all duration-200 text-sm"
                />
                <button
                  onClick={() => setShowInput(false)}
                  className="px-3 py-1 bg-[#6a5fff] hover:bg-[#5a4fef] text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Campos de texto */}
      <div className="space-y-2">
        {/* Nombre del tablero */}
        <label className="block text-white font-medium pt-4">
          Nombre de tablero
        </label>
        <div className="relative w-[575px]">
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ut enim ad minim"
            className="w-full h-[48px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-xl px-2 py-2 border border-[#3c3c3c] outline-none focus:ring-1 focus:ring-[#6A5FFF] focus:border-[#6A5FFF] transition-all duration-200"
          />
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label className="block text-white font-medium pt-3">
          Descripción
        </label>
        <div className="relative w-[575px]">
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Descripción del tablero..."
            rows={4}
            className="w-full bg-[#1e1e1e] text-white placeholder-[#797676] rounded-xl px-2 py-2 border border-[#3c3c3c] outline-none focus:ring-1 focus:ring-[#6A5FFF] focus:border-[#6A5FFF] transition-all duration-200 resize-none"
          />
        </div>
        <div className="text-xs text-gray-500">
          {description.length}/500 caracteres
        </div>
      </div>
    </div>
  );
}