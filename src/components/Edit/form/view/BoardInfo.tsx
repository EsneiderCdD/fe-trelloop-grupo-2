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
    <div>
      <div className="mb-4 cursor-pointer" onClick={() => setShowInput(true)}>
        <Image
          src={safeImageUrl}
          alt="Imagen del tablero"
          width={130}
          height={130}
          className="rounded-2xl w-[130px] h-[130px] hover:opacity-80 transition"
        />
      </div>

      {showInput && (
        <div className="mb-4">
          <label className="text-white text-sm font-medium mb-1 block">
            Agrega URL de{" "}
            <a
              href="https://cloudinary.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6a5fff] underline"
            >
              Cloudinary
            </a>
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-[575px] h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
          />
        </div>
      )}

      <div className="text-white text-sm font-medium mb-1">Nombre de tablero</div>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Ut enim ad minim"
        className="w-[575px] h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition mb-4"
      />

      <div className="text-white text-sm font-medium mb-1">Descripción</div>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Descripción del tablero"
        className="w-[575px] h-[106px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition resize-none"
      />
    </div>
  );
}
