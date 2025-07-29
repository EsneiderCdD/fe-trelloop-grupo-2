import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  boardId: string;
}

const BoardMenu: React.FC<Props> = ({ onClose, boardId }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/Edit"); // Redirige a editar tablero
    onClose();
  };

  const handleDelete = () => {
    alert(`Eliminar tablero con ID: ${boardId}`);
    onClose();
  };

  return (
    <div
      className="absolute z-50"
      style={{
        width: "223px",
        height: "123px",
        top: "410px",
        left: "265px",
        borderRadius: "8px",
        background: "rgba(39, 39, 39, 1)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
        padding: "16px 20px 16px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <button
        onClick={handleEdit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "187px",
          height: "37px",
          padding: "8px 16px",
          borderRadius: "6px",
          transition: "background 0.2s ease",
        }}
        className="hover:bg-[#3A3A3A]"
      >
        <img
          src="/assets/icons/edit.png"
          alt="Editar"
          style={{ width: "16px", height: "16px" }}
        />
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "100%",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Editar tablero
        </span>
      </button>

      <button
        onClick={handleDelete}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "187px",
          height: "37px",
          padding: "8px 16px",
          borderRadius: "6px",
          transition: "background 0.2s ease",
        }}
        className="hover:bg-[#3A3A3A]"
      >
        <img
          src="/assets/icons/trash.png"
          alt="Eliminar"
          style={{ width: "16px", height: "16px" }}
        />
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "100%",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Eliminar tablero
        </span>
      </button>

      {/* Animación disolver */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default BoardMenu;