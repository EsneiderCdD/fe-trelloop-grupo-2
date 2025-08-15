"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import CloseButton from "components/ui/CloseButton";
import { useRouter } from "next/navigation";




export default function AddTask() {

    const router = useRouter();


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
                <div className="flex items-center justify-between p-5">
                    {/* Datepicker*/}
                    <h1>Hola Mundo lo</h1>



                    {/* Formulario para crear una nueva tarjeta */}
                    <form className="flex-1 p-6">
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Título de la tarjeta</label>
                            <input type="text" className="font-poppins w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]" placeholder="Escribe aquí" />
                        </div>
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Descripción</label>
                            <textarea className="font-poppins w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]" rows={4} placeholder="Escribe aquí"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Responsables</label>
                            <div className="w-full flex items-center gap-2 bg-[#2B2B2B] rounded-[8px]">
                                <input type="text" className="flex-1 font-poppins w-full p-2 rounded-lg bg-[#2a2a2a] text-white focus:ring-2 focus:ring-[#6a5fff]" placeholder="Busca por nombre o @usuario" />
                                <img src="/assets/icons/search.svg" alt="Buscar" className="w-5 h-5 mr-2" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Prioridad</label>
                            <select className="font-poppins w-full p-2 rounded-lg bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]">
                                <option value="" disabled selected>Agrega una prioridad...</option>
                                <option value="alta" className="text-white">Alta</option>
                                <option value="media" className="text-white">Media</option>
                                <option value="baja" className="text-white">Baja</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Estado</label>
                            <select className="font-poppins w-full p-2 rounded-lg bg-[#2a2a2a]  text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]">
                                <option value="" disabled selected>Agrega un estado...</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en-progreso">En progreso</option>
                                <option value="completado">Completado</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="font-poppins block text-white mb-2">Etiquetas</label>
                            <input type="text" className="font-poppins w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]" placeholder="Escribe un nombre de etiqueta para crearla" />
                        </div>
                        <div className="flex mt-16">
                            <button type="submit" className="font-poppins flex-1 py-2 border border-[#6A5FFF] text-[#6A5FFF] rounded-[8px] hover:bg-[#5a4fef1b]">Cancelar creación</button>
                            <button type="submit" className="font-poppins flex-1 ml-4 py-2 bg-[#6A5FFF] hover:bg-[#5A4FEF] text-white rounded-[8px]">Crear tarjeta</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}