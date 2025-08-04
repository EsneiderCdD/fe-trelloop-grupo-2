import DashboardSidebar from "components/home/DashboardSidebar";
import Form from "./form"; // Importa el formulario completo
import { useEffect, useState } from "react";

type Props = {
  boardId: string;
};

export default function EditBoardView({ boardId }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // En el futuro: aquí puedes hacer el fetch
  useEffect(() => {
    if (!boardId) {
      setError("ID de tablero inválido");
      setLoading(false);
      return;
    }

    // Simula delay de carga (borra esto cuando agregues el fetch real)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [boardId]);

  if (loading) {
    return <div className="text-white p-6">Cargando tablero...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#1A1A1A]">
      <div className="flex w-full max-w-[1366px]">
        <div className="shrink-0">
          <DashboardSidebar />
        </div>
        <div className="flex-1 px-8 py-4 text-white">
          <h1 className="text-2xl font-semibold mb-4">Editar Tablero</h1>
          <Form boardId={boardId} /> {/* Puedes pasarlo al formulario si lo necesitas */}
        </div>
      </div>

      <style jsx>{`* { border: 1px dotted red; }`}</style>
    </div>
  );
}
