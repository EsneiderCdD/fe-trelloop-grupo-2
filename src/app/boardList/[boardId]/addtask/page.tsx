"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import CloseButton from "components/ui/CloseButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "styles/datepicker.css";
import { es } from "date-fns/locale";
import ReminderSelect from "components/Edit/form/view/ReminderSelect";
import Tags from "components/Edit/form/view/Tags";





export default function AddTask() {

    const router = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const handleDeleteTag = (tagToRemove: string) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
            setStartDate(date);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
            setEndDate(date);
        }
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
                <div className="flex ms-[60px] p-5 w-full">
                    {/* Datepicker*/}
                    <div className="mb-4 w-[325px]">
                        <div className="justify-between p-5">
                            <label className="font-poppins block text-white mb-2">Fecha de tarjeta</label>
                            <div className="font-poppins w-full rounded-lg ms-2 outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] p-5">
                                <DatePicker
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    locale={es}
                                    selectsRange
                                    inline
                                />
                                <div className="flex items-center">
                                    <input
                                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                        onChange={handleStartDateChange}
                                        className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]"
                                        placeholder="Desde"
                                    />
                                    <input
                                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                        onChange={handleEndDateChange}
                                        className="font-poppins w-full p-2 rounded-xl ms-2 outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]"
                                        placeholder="Hasta"
                                    />
                                </div>
                                <label className="font-poppins block text-white text-sm mt-5 mb-2">Crear recordatorio</label>
                                {/* <ReminderSelect /> */}
                            </div>
                        </div>
                    </div>
                    {/* Formulario para crear una nueva tarjeta */}
                    <form className="flex-1 p-6">
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Título de la tarjeta</label>
                            <input type="text" className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]" placeholder="Escribe aquí" />
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Descripción</label>
                            <textarea className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200" rows={4} placeholder="Escribe aquí"></textarea>
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Responsables</label>
                            <div className="w-full flex items-center gap-2 bg-[#2B2B2B] rounded-[8px]">
                                <input type="text" className="flex-1 font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200" placeholder="Busca por nombre o @usuario" />
                                <img src="/assets/icons/search.svg" alt="Buscar" className="w-5 h-5 mr-2" />
                            </div>
                            <div className="flex">
                                <div className="flex mt-4 mb-4 me-5 items-center">
                                    <div className="w-7 h-7 rounded-full border me-2 border-white bg-[#000000] ">
                                        <img src="/assets/icons/user.png" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="font-poppins block text-sm text-white">Nombre completo</label>
                                        <label className="font-poppins block text-xs text-white">@usuario</label>
                                    </div>
                                </div>
                                <div className="flex mt-4 mb-4 items-center">
                                    <div className="w-7 h-7 rounded-full border me-2 border-white bg-[#000000] ">
                                        <img src="/assets/icons/user.png" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="font-poppins block text-sm text-white">Nombre completo</label>
                                        <label className="font-poppins block text-xs text-white">@usuario</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Prioridad</label>
                            <select className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200">
                                <option hidden>Agrega una prioridad...</option>
                                <option value="alta" className="text-white">Alta</option>
                                <option value="media" className="text-white">Media</option>
                                <option value="baja" className="text-white">Baja</option>
                            </select>
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Estado</label>
                            <select className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200">
                                <option hidden>Agrega un estado...</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en-progreso">En progreso</option>
                                <option value="completado">Completado</option>
                            </select>
                        </div>
                        <div className="font-poppins mb-4 w-[575px]">
                            <Tags
                                tags={tags}
                                onAdd={(newTag) => setTags((prev) => [...prev, newTag])}
                                onDelete={handleDeleteTag}
                            />
                        </div>
                        <div className="flex w-[575px]">
                            <button type="submit" className="font-poppins flex-1 py-2 border border-[#6A5FFF] text-[#6A5FFF] rounded-xl hover:bg-[#5a4fef1b]">Cancelar creación</button>
                            <button type="submit" className="font-poppins flex-1 ml-4 py-2 bg-[#6A5FFF] hover:bg-[#5A4FEF] text-white rounded-xl">Crear tarjeta</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}