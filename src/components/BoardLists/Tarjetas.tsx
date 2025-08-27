import React, { useState } from "react";

interface TarjetaProps {
  descripcion: string;
  etiquetas: string;
  personas: number;
  comentarios: number;
}

const Tarjeta: React.FC<TarjetaProps> = ({
  descripcion,
  etiquetas,
  personas,
  comentarios,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative bg-[#3a3a3a] w-[240px] h-[111px] rounded-md p-1 border-l-4 border-purple-600">
      {/* Fila superior: etiqueta + menú */}
      <div className="flex items-center justify-between mb-1">
        <div className="rounded-[16px] border border-[#979797] text-white text-[11px] px-3 py-0.5 w-fit">
          {etiquetas}
        </div>
        <button onClick={() => setShowMenu(!showMenu)}>
          <img
            src="/assets/icons/ellipsis.svg"
            alt="Opciones"
            className="w-6 h-6 transform rotate-90"
          />
        </button>
      </div>

      {/* Descripción */}
      <div className="text-[#E5E7EB] text-sm mb-2 line-clamp-2 overflow-hidden">
        {descripcion}
      </div>

      {/* Fila inferior: personas + contador comentarios */}
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div className="flex -space-x-2">
          {/* Avatares dummy (pueden reemplazarse por imágenes reales de los usuarios) */}
          <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-[#3a3a3a]" />
          <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-[#3a3a3a]" />
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-[#3a3a3a]" />
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white mr-1 text-sm">{comentarios}</span>
          <img
            src="/assets/icons/workflow.svg"
            alt="Comentarios"
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Menú contextual */}
      {showMenu && (
        <div className="absolute top-5 left-56 z-50 w-[223px] h-[150px] rounded-md bg-[#272727] shadow-lg p-4 flex flex-col gap-2 animate-fade-in">
          <button className="flex items-center gap-2 w-full h-[37px] px-4 rounded-md hover:bg-[#3A3A3A]">
            <img src="/assets/icons/edit.png" alt="Ver" className="w-4 h-4" />
            <span className="text-white text-sm font-medium">Ver tarjeta</span>
          </button>

          <button className="flex items-center gap-2 w-full h-[37px] px-4 rounded-md hover:bg-[#3A3A3A]">
            <img src="/assets/icons/edit.png" alt="Editar" className="w-4 h-4" />
            <span className="text-white text-sm font-medium">Editar tarjeta</span>
          </button>

          <button className="flex items-center gap-2 w-full h-[37px] px-4 rounded-md hover:bg-[#3A3A3A]">
            <img src="/assets/icons/trash.png" alt="Eliminar" className="w-4 h-4" />
            <span className="text-white text-sm font-medium">Eliminar tarjeta</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Tarjeta;
