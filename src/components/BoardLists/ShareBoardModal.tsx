"use client";

import { useState } from "react";
import {
  XMarkIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface ShareBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
}

interface BoardMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Administrador" | "Miembro";
}

export default function ShareBoardModal({
  isOpen,
  onClose,
  boardId,
}: ShareBoardModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Miembro");
  const [boardLink] = useState("www.url.com");

  // Datos de ejemplo - en producción vendrían de una API
  const [members, setMembers] = useState<BoardMember[]>([
    {
      id: "1",
      name: "Usuario 1",
      email: "usuario1@email.com",
      avatar: "/assets/icons/avatar1.png",
      role: "Administrador",
    },
    {
      id: "2",
      name: "Usuario 2",
      email: "usuario2@email.com",
      avatar: "/assets/icons/avatar2.png",
      role: "Miembro",
    },
    {
      id: "3",
      name: "Usuario 3",
      email: "usuario3@email.com",
      avatar: "/assets/icons/avatar1.png",
      role: "Miembro",
    },
    {
      id: "4",
      name: "Usuario 4",
      email: "usuario4@email.com",
      avatar: "/assets/icons/avatar2.png",
      role: "Miembro",
    },
  ]);

  const handleShare = () => {
    // Lógica para compartir con el usuario buscado
    console.log("Compartir con:", searchQuery, "Rol:", selectedRole);
    setSearchQuery("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(boardLink);
    // Aquí podrías mostrar una notificación de éxito
  };

  const handleDeleteLink = () => {
    // Lógica para eliminar el enlace de compartir
    console.log("Eliminar enlace");
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, role: newRole as "Administrador" | "Miembro" }
          : member
      )
    );
  };

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute top-14 right-8 bg-[#1e1e1e] rounded-lg w-[800px] max-h-[85vh] border border-[#3a3a3a] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <h2 className="text-xl font-semibold text-white">
            Compartir tablero
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sección de búsqueda y compartir */}
          <div className="space-y-4 border-b border-[#3a3a3a] pb-6">
            {/* Contenedor común para input y enlace */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Buscar por nombre, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#6a5fff] focus:border-transparent outline-none"
                />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-6 py-2 bg-[#000000] border border-[#000000] rounded-lg text-white focus:ring-2 focus:ring-[#6a5fff] focus:border-transparent outline-none"
                >
                  <option value="Miembro">Miembro</option>
                  <option value="Administrador">Administrador</option>
                </select>
                <button
                  onClick={handleShare}
                  className="px-6 py-2 bg-[#6A5FFF] text-white rounded-lg hover:bg-[#5a4fef] transition-colors font-medium"
                >
                  + Compartir
                </button>
              </div>

              {/* Compartir por enlace */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-[#3a3a3a] w-full">
                    <LinkIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-white font-mono text-sm w-full">
                      {boardLink}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={handleCopyLink}
                      className="text-white hover:text-[#5a4fef] text-sm font-sm underline"
                    >
                      Copiar enlace
                    </button>
                    <button
                      onClick={handleDeleteLink}
                      className="text-white hover:text-red-300 text-sm font-sm underline"
                    >
                      Eliminar enlace
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-4 max-w-[200px]">
                  Cualquiera que tenga el enlace puede unirse como miembro
                </p>
              </div>
            </div>
          </div>
          
          {/* Sección de miembros del tablero */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">
                Miembros del tablero
              </h3>
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {members.length}
                </span>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-white text-sm">{member.role}</p>
                    </div>
                  </div>
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleRoleChange(member.id, e.target.value)
                    }
                    className="px-4 py-2 bg-[#000000] border border-[#000000] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#6a5fff] focus:border-transparent outline-none"
                  >
                    <option value="Miembro">Miembro</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Eliminar" className="text-red-400">Eliminar</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
