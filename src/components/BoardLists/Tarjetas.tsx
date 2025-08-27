import React, { useState } from "react";

interface Assignee {
  avatar_url: string;
  name: string;
}

interface TarjetaProps {
  descripcion: string;
  etiquetas: string[];
  assignees: Assignee[];
  comentarios: number;
  prioridad?: string; // puede venir "Baja", "Media", "Alta" del backend
}

const Tarjeta: React.FC<TarjetaProps> = ({
  descripcion,
  etiquetas,
  assignees,
  comentarios,
  prioridad,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Mapear prioridad del backend a valores internos
  const mapPriorityBackendToInternal = (prioridad?: string) => {
    if (!prioridad) return prioridad;
    switch (prioridad.toLowerCase()) {
      case "baja":
        return "low";
      case "media":
        return "medium";
      case "alta":
        return "high";
      default:
        return prioridad;
    }
  };

  // Obtener color según prioridad
  const getPriorityColor = (prioridad?: string) => {
    const internal = mapPriorityBackendToInternal(prioridad);
    switch (internal) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-green-500";
      default:
        return "border-purple-600"; // fallback
    }
  };

  return (
    <div
      className={`relative bg-[#3a3a3a] w-[240px] h-[101px] rounded-md p-1 border-l-4 flex flex-col justify-between ${getPriorityColor(
        prioridad
      )}`}
    >
      {/* Fila superior: etiquetas + menú */}
      <div className="flex items-center justify-between">
        <div className="rounded-[16px] bg-[#414141] text-[#E5E7EB] text-[11px] font-poppins px-3 py-0.5 w-fit">
          {etiquetas.length > 0 ? etiquetas.join(", ") : "Sin etiquetas"}
        </div>

        <button onClick={() => setShowMenu(!showMenu)}>
          <img
            src="/assets/icons/ellipsis.svg"
            alt="Opciones"
            className="w-6 h-6 transform rotate-90"
          />
        </button>
      </div>

      {/* Título con máximo 2 líneas */}
      <div
        className="text-[#E5E7EB] text-sm mb-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {descripcion}
      </div>

      {/* Fila inferior: avatars + comentarios */}
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div className="flex -space-x-2">
          {assignees.map((user, idx) => (
            <img
              key={idx}
              src={user.avatar_url}
              alt={user.name}
              className="w-6 h-6 rounded-full border-2 border-[#3a3a3a]"
            />
          ))}
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
