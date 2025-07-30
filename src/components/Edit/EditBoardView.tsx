import DashboardSidebar from "components/home/DashboardSidebar";
import Form from "./form"; // Importa el formulario completo

export default function EditBoardView() {
    return (
        <div className="flex min-h-screen bg-[#1A1A1A]">
            <div className="flex w-full max-w-[1366px]">
                <div className="shrink-0">
                    <DashboardSidebar />
                </div>
                <div className="flex-1 px-8 py-4 text-white">
                    <h1 className="text-2xl font-semibold mb-4">Editar Tablero</h1>
                    <Form /> {/* ✅ Aquí está BoardInfo y más en el futuro */}
                </div>
            </div>

            <style jsx>{`* { border: 1px dotted red; }`}</style>
        </div>
    );
}
