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
                {/* Navbar autenticado con buscador, iconos y sin botón */}
                <UserNavbar showCreateBoardButton={false} />
                <div className="flex flex-col justify-start items-end w-full px-6 pt-4 pb-6 relative">
                    <div className="w-full h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 pr-10 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition">
                        <div className="grid max-w-xs grid-cols-2 gap-1 my-[-3px] text-[#6A5FFF] rounded-lg dark:text-white">
                            <button type="button" className="px-5 py-1.5 text-xs font-medium hover:bg-[#6A5FFF] hover:text-white rounded-lg">
                                Backlog
                            </button>
                            <button type="button" className="px-5 py-1.5 text-xs font-medium hover:bg-[#6A5FFF] hover:text-white rounded-lg">
                                Listas
                            </button>
                        </div>
                    </div>
                </div>
                <h1 className="bg-white">Lista del tablero </h1>
                <h1 className="bg-white">Board ID: {id}</h1>
            </main>
        </div>
    );
}