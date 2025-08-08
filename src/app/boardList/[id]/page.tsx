"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import { useParams } from "next/navigation";
import VistaListas from "components/BoardLists/VistaListas";


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
                    <div className="flex items-center justify-between w-full h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 pr-10 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition">
                        <div className="flex-grow flex items-center justify-start gap-4">
                            <button type="button" className="px-5 py-1.5 text-xs font-medium hover:bg-[#6A5FFF] hover:text-white rounded-lg">
                                Backlog
                            </button>
                            <button type="button" className="px-5 py-1.5 text-xs font-medium hover:bg-[#6A5FFF] hover:text-white rounded-lg">
                                Listas
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-500"><img src="/assets/icons/avatar1.png" /></div>
                            <div className="w-6 h-6 rounded-full bg-gray-400"><img src="/assets/icons/avatar2.png" /></div>
                            <button type="button" className="w-6 h-6 rounded-full border border-[#3a3a3a] bg-dark flex items-center justify-center text-gray-400 font-bold text-xl">
                                <img src="/assets/icons/plus.svg" />
                            </button>
                        </div>
                    </div>
                </div>
                <h1 className="bg-white">Lista del tablero </h1>
                <h1 className="bg-white">Board ID: {id}</h1>
                <VistaListas/>
            </main>
        </div>
    );
}