"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import { useParams } from "next/navigation";


interface BoardListProps {
    params: { id: string }
}

export default function BoardListPage() {
    const { id } = useParams();


    return (
        <div className="flex bg-[#1A1A1A] min-h-screen">
            {/* Sidebar lateral */}
            <DashboardSidebar />

            {/* Contenido principal */}
            <main className="flex-1 flex flex-col">
                {/* Navbar autenticado con buscador, iconos y botón */}
                <UserNavbar showCreateBoardButton={false} />
                <h1 className="bg-white">Lista del tablero </h1>
                <h1 className="bg-white">Board ID: {id}</h1>
            </main>
        </div>
    );
}