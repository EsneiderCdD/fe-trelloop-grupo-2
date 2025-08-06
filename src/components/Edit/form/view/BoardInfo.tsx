"use client";
import { useRef, useState } from "react";
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      onImageUrlChange(objectUrl); // esto actualiza el estado en el padre si lo usas así
    }
  };

  const safeImageUrl = previewImage || imageUrl?.trim() || DEFAULT_IMAGE_URL;

  return (
    <div>
      {/* Imagen que se puede hacer clic */}
      <div className="mb-4 cursor-pointer" onClick={handleImageClick}>
        <Image
          src={safeImageUrl}
          alt="Imagen del tablero"
          width={130}
          height={130}
          className="rounded-2xl w-[130px] h-[130px] hover:opacity-80 transition object-cover"
        />
      </div>

      {/* Input de archivo oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Nombre del tablero */}
      <div className="text-white text-sm font-medium mb-1">Nombre de tablero</div>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Ut enim ad minim"
        className="w-[575px] h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition mb-4"
      />

      {/* Descripción */}
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
