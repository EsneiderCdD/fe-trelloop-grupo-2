"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import CloseButton from "components/ui/CloseButton";
import { useRouter } from "next/navigation";



export default function AddTask() {

    const router = useRouter();
    const goToPreviousPage = () => {
        router.back();
    };


    return (
        <div className="flex bg-[#1A1A1A] min-h-screen">
            {/* Sidebar lateral */}
            <DashboardSidebar />
            <main className="flex-1 flex flex-col">
                {/* Navbar autenticado con buscador, iconos y sin botón */}
                <UserNavbar showCreateBoardButton={false} />
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-lg font-poppins whitespace-nowrap text-white">Crear tarjeta </h1>
                    <CloseButton onClick={() => router.back()} />
                </div>
            </main>
        </div>
    );
}