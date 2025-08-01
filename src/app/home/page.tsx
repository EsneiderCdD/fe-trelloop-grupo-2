"use client";

import UserNavbar from "components/home/UserNavbar";
import DashboardSidebar from "../../components/home/DashboardSidebar";
import UserBoards from "components/home/UserBoards";
//import UserNavbar from "../../components/home/UserNavbar";
//import UserBoards from "../../components/home/UserBoards";

export default function HomePage() {
  return (
    <div className="flex bg-[#1A1A1A] min-h-screen">
      {/* Sidebar lateral */}
      <DashboardSidebar />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col">
        {/* Navbar autenticado con buscador, iconos y botón */}
        <UserNavbar />

        {/* Sección de tableros */}
        <div className="px-6 pb-20">
          <UserBoards />
        </div>
      </main>
    </div>
  );
}