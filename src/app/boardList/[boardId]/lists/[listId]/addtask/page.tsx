"use client";

import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import CloseButton from "components/ui/CloseButton";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import { getToken } from "store/authStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "styles/datepicker.css";
import { es } from "date-fns/locale";
import ReminderSelect from "components/Edit/form/view/ReminderSelect";
import Tags from "components/Edit/form/view/Tags";


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export default function AddTask() {

    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("pending");
    const [members, setMembers] = useState<any[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [reminderDate, setReminderDate] = useState<Date | null>(null);
    const [reminderMessage, setReminderMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { boardId } = useParams<{ boardId: string; }>();
    const { listId } = useParams<{ listId: string; }>();

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

    const handleReminderDateChange = (date: Date | null, message: string) => {
        setReminderDate(date);
        setReminderMessage(message);
        console.log("Recordatorio establecido para:", date, "con mensaje:", message);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        console.log("Enviando formulario con datos:", { title, description, priority, status, members, tags, startDate, endDate, reminderDate, reminderMessage })


        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
        const formattedReminderDate = reminderDate ? reminderDate.toISOString().split('T')[0] : null;

        console.log("Fechas formateadas:", { formattedStartDate, formattedEndDate, formattedReminderDate });

        const cardData = {
            title,
            description,
            priority,
            status,
            members,
            tags,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            reminder_date: formattedReminderDate,
            reminder_message: reminderMessage
        };

        const token = getToken();

        try {
            const response = await fetch(`${API_BASE_URL}/api/boards/${boardId}/lists/${listId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(cardData),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess("Tarjeta creada exitosamente");
                console.log("Tarjeta creada:", data);
                router.push(`/boardList/${boardId}`);
            } else {
                setError(data.message || "Error al crear la tarjeta");
                console.error("Error al crear la tarjeta:", data);
            }
        } catch (error) {
            setError("Error de red al crear la tarjeta");
            console.error("Error de red al crear la tarjeta:", error);
        };
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
                <div className="flex p-5 w-full">
                    {/* Datepicker*/}
                    <div className="mb-4 w-[325px] ms-[60px]">
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
                                <ReminderSelect />
                            </div>
                        </div>
                    </div>
                    {/* Formulario para crear una nueva tarjeta */}
                    <form className="flex-1 p-6" onSubmit={handleSubmit}>
                        {error && <div className="mb-4 text-red-500 font-poppins">{error}</div>}
                        {success && <div className="mb-4 text-green-500 font-poppins">{success}</div>}
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Título de la tarjeta</label>
                            <input type="text" className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]"
                                placeholder="Escribe aquí"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Descripción</label>
                            <textarea className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200"
                                rows={4}
                                placeholder="Escribe aquí"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
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
                            <select
                                className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option hidden>Agrega una prioridad...</option>
                                <option value="high" className="text-white">Alta</option>
                                <option value="medium" className="text-white">Media</option>
                                <option value="low" className="text-white">Baja</option>
                            </select>
                        </div>
                        <div className="mb-4 w-[575px]">
                            <label className="font-poppins block text-white mb-2">Estado</label>
                            <select
                                className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option hidden>Agrega un estado...</option>
                                <option value="pending">Pendiente</option>
                                <option value="in-progress">En progreso</option>
                                <option value="done">Completado</option>
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