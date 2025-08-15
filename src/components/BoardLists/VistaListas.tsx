import React, { useEffect } from "react";
import AddListModal from "./AddListButton";
import { useParams } from "next/navigation";
import { getToken } from "../../store/authStore";

// ⬅️ Nuevo import del servicio
import { getListsService } from "../../services/getListservice";
import { updateListService } from "../../services/updateListService";

interface Tarea {
  board_id: number;
  id: number;
  etiquetas: string;
  descripcion: string;
  personas: number;
  comentarios: number;
}

interface Columna {
  id: number;
  titulo: string;
  color: string;
  bordeColor: string; // Nueva propiedad para el color del borde
  tareas: Tarea[];
}

// interface Columna {
//   id: number;
//   titulo: string;
//   color: string; // clases Tailwind para color de encabezado
//   tareas: Tarea[];
// }

const VistaListas: React.FC = () => {
  //   const columnas: Columna[] = [
  //     {
  //       id: 1,
  //       titulo: "Por hacer",
  //       color: "bg-[#6d4c41]", // Marrón
  //       tareas: [
  //         { id: 1, etiquetas: "Etiquetas", descripcion: "Ut enim ad minim veniam, quis nostrud", personas: 3, comentarios: 3 },
  //         { id: 2, etiquetas: "Etiquetas", descripcion: "Ut enim ad minim veniam, quis nostrud", personas: 3, comentarios: 5 },
  //         { id: 3, etiquetas: "Etiquetas", descripcion: "Ut enim ad minim veniam, quis nostrud", personas: 3, comentarios: 7 },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       titulo: "En progreso",
  //       color: "bg-[#0288d1]", // Azul
  //       tareas: [
  //         { id: 4, etiquetas: "Etiquetas", descripcion: "Ut enim ad minim veniam, quis nostrud", personas: 3, comentarios: 5 },
  //       ],
  //     },
  //   ];

  const { id: boardIdParam } = useParams();
  const boardId = Number(boardIdParam);

  const [editandoListaId, setEditandoListaId] = React.useState<number | null>(null);
  const [nuevoTitulo, setNuevoTitulo] = React.useState<string>("");

  const [columnas, setColumnas] = React.useState<Columna[]>([]);

const guardarTitulo = async (columnaId: number) => {
  const tituloTrim = nuevoTitulo.trim();
  if (!tituloTrim) {
    alert("El nombre no puede estar vacío");
    return;
  }
  if (tituloTrim.length > 25) {
    alert("El nombre no puede tener más de 25 caracteres");
    return;
  }

  try {
    // Llamada al backend
    const columna = columnas.find(col => col.id === columnaId);
    if (!columna) return;

    console.log("DEBUG -> columnaId:", columnaId, "tituloTrim:", tituloTrim);


    await updateListService(boardId, columnaId, tituloTrim);

    // Actualiza localmente solo si el backend fue exitoso
    setColumnas((prevColumnas) =>
      prevColumnas.map((col) =>
        col.id === columnaId ? { ...col, titulo: tituloTrim } : col
      )
    );

    setEditandoListaId(null);
  } catch (err: any) {
    console.error("Error al actualizar la lista", err);
    alert(err.message || "Error al actualizar la lista");
  }
};


  React.useEffect(() => {
    const fetchLists = async () => {
      try {
        // ⬅️ Antes lo hacíamos con fetch directo, ahora usamos nuestro servicio
        const token = getToken();
        if (!token) {
          console.error("No hay token de autenticación");
          return;
        }

    const data = await getListsService(boardId);
    console.log("Respuesta de getListsService:", data);

   setColumnas(
  data.map((list: any) => ({
    id: list.id,
    titulo: list.name,
    color: "bg-[#6d4c41]",
    bordeColor: "border-l-red-500",
    tareas: [], 
  }))
);

      } catch (err) {
        console.error("Error general fetching lists", err);
      }
    };

    if (boardId) {
      fetchLists();
    }
  }, [boardId]);

  return (
    <div className="flex gap-4 p-4 bg-[#1a1a1a] h-full">
      {columnas.map((columna) => (
        <div key={columna.id} className="flex flex-col w-64">
          {/* Encabezado */}
          <div
            className={`flex justify-between items-center px-3 py-2 rounded-t-md ${columna.color}`}
          >
            {editandoListaId === columna.id ? (
              <input
                type="text"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                onBlur={() => guardarTitulo(columna.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    guardarTitulo(columna.id);
                  }
                }}
                className="bg-transparent border-b border-white text-white font-semibold focus:outline-none w-full"
                autoFocus
              />
            ) : (
              <h2 className="text-white font-semibold">{columna.titulo}</h2>
            )}

            <div className="flex items-center">
              <span className="text-white">{columna.tareas.length}</span>
              <img
                src="/assets/icons/square-pen.svg"
                alt="Editar lista"
                className="w-4 h-4 cursor-pointer ml-2"
                onClick={() => {
                  setEditandoListaId(columna.id);
                  setNuevoTitulo(columna.titulo);
                }}
              />
            </div>

          </div>

          {/* Lista de tareas */}
          <div className="flex flex-col gap-3 bg-[#2b2b2b] p-3 rounded-b-md flex-1">
            {columna.tareas.map((tarea) => (
              <div
                key={tarea.id}
                className={`bg-[#3a3a3a] rounded-md p-3 border-l-4 ${columna.bordeColor}`}
              >
                <div className="text-gray-400 text-sm mb-2">
                  {tarea.etiquetas}
                </div>
                <div className="text-white text-sm mb-2">
                  {tarea.descripcion}
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>👥 {tarea.personas}</span>
                  <span>💬 {tarea.comentarios}</span>
                </div>
              </div>
            ))}

            {/* Botón agregar tarea */}
            <button className="mt-2 py-2 px-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              + Agregar tarea
            </button>
          </div>
        </div>
      ))}
      <div className="relative">
        <AddListModal boardId={boardId} />
      </div>
    </div>
  );
};

export default VistaListas;
