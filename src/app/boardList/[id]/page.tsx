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
            <div className="fixed top-3000 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div className="w-full">
                    <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                        <button type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                            New
                        </button>
                        <button type="button" className="px-5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg">
                            Popular
                        </button>
                        <button type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                            Following
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}