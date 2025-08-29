"use client";
import Responsible from "components/EditCard/Responsible";
import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import React, { useEffect, useState } from "react";
import { updateListCardById } from "services/cardService";
import { getToken } from "store/authStore";
import { useParams, useRouter } from "next/navigation";
import Tags from "components/Edit/form/view/Tags";
import ReminderSelect from "components/Edit/form/view/ReminderSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "styles/datepicker.css";
import { es, se } from "date-fns/locale";
import CloseButton from "components/ui/CloseButton";
import { adapter } from "next/dist/server/web/adapter";
import { title } from "process";

export default function PgtListasEditar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { boardId, listId, cardId } = useParams<{
    boardId: string;
    listId: string;
    cardId: string;
  }>();
  const boardIdNum = Number(boardId);
  const listIdNum = Number(listId);
  const cardIdNum = Number(cardId);
  const initialFormState = {
    title: "",
    description: "",
    assignees: [],
    priority: "",
    status: "",
    tags: [],
    startDate: null,
    endDate: null,
    reminderDate: null,
  };
  const [form, setForm] = useState<any>(initialFormState);

  useEffect(() => {
    const fetchBoard = async () => {
      const token = getToken();
      if (!token) {
        setError("No estás autenticado.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("No se pudo cargar el tablero.");
        }

        const data = await res.json();

        const filteredList = data.lists.find(
          (list: any) => list.id === listIdNum
        );

        const filteredCard = filteredList.cards.find(
          (card: any) => card.id === cardIdNum
        );
        console.log(filteredCard);

        let cardMembers = (filteredCard?.assignees || []).map((user: any) => ({
          id: String(user.id),
          name: `${user.name} ${user.last_name}`.trim(),
          username: user.email?.split("@")[0] || "usuario",
          email: user.email,
          img: user.avatar_url,
        }));

        setForm({
          title: filteredCard?.title || "",
          description: filteredCard?.description || "",
          assignees: cardMembers || [],
          priority: filteredCard?.priority || "",
          status: filteredCard?.status || "",
          tags: filteredCard?.tags || [],
          startDate: filteredCard?.start_date
            ? new Date(filteredCard.start_date)
            : null,
          endDate: filteredCard?.end_date
            ? new Date(filteredCard.end_date)
            : null,
          reminderDate: filteredCard?.reminder_date
            ? new Date(filteredCard.reminder_date)
            : null,
        });
      } catch (err: any) {
        setError(err.message || "Error desconocido.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);
  console.log(form);

  const handleDeleteResponsible = async (id: string) => {
    try {
      //elimino el email correspondiente
      const updatedMembers = form.assignees.filter((m: any) => m.id !== id);

      // Enviar los email que quedaran
      await updateListCardById(boardIdNum, listIdNum, cardIdNum, {
        assignee_ids: updatedMembers.map((m: any) => m.email),
      });

      // Actualizamos el estado local
      setForm((prevForm: any) => ({
        ...prevForm,
        assignees: updatedMembers,
      }));
    } catch (error) {
      console.error("Error al eliminar responsable:", error);
    }
  };

  const handleAddResponsible = async (user: any) => {
    try {
      // Verificar que no esté ya agregado
      const exists = form.assignees.some((m: any) => m.id === user.id);
      if (exists) return;

      // nuevo array con el usuario agregado
      const updatedMembers = [...form.assignees, user];

      // Mandamos al backend la lista de emails
      await updateListCardById(boardIdNum, listIdNum, cardIdNum, {
        assignee_ids: updatedMembers.map((m) => m.email),
      });

      // Actualizamos estado local
      setForm((prevForm: any) => ({
        ...prevForm,
        assignees: updatedMembers,
      }));
    } catch (error) {
      console.error("Error al agregar responsable:", error);
    }
  };

  const handleDeleteTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setForm((prevForm: any) => ({
        ...prevForm,
        startDate: date,
      }));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setForm((prevForm: any) => ({
        ...prevForm,
        endDate: date,
      }));
    }
  };

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setForm((prevForm: any) => ({
      ...prevForm,
      startDate: start,
      endDate: end,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adaptFormData = {
        title: form.title,
        description: form.description,
        reminder: form.reminder,
        status: form.status,
        assignee_ids: form.assignees.map((m: any) => m.email),
        tags: form.tags.map((t: any) => t.name),
        start_date: form.startDate.toISOString().split("T")[0],
        end_date: form.endDate.toISOString().split("T")[0],
        reminder_message: "Revisar avance",
      };
      await updateListCardById(boardIdNum, listIdNum, cardIdNum, adaptFormData);
      // router.push(`/boardList/${boardId}`);
    } catch (error) {
      console.error("Error al actualizar tarjeta:", error);
    }
  };
  return (
    <div className="flex bg-[#191919] h-full w-full">
      {/* Sidebar lateral */}
      <DashboardSidebar />
      <div className="min-w-0 w-full">
        <UserNavbar showCreateBoardButton={false} />
        <div className="flex items-center justify-between p-5">
          <h1 className="text-2xl font-poppins whitespace-nowrap text-white">
            Editar tarjeta{" "}
          </h1>
          <CloseButton onClick={() => router.back()} />
        </div>
        {/* Main Content */}
        <div className=" p-6 flex items-center justify-center w-full">
          <form
            onSubmit={onSubmit}
            className="flex items-center justify-center w-full"
          >
            <div className="flex gap-16 max-w-7xl justify-center">
              {/* Left Column - Date Picker */}
              <div className="w-[320px] flex-shrink-0">
                <div className="mb-4 w-[325px] p-5 pt-0">
                  <label className="font-poppins block text-white mb-2">
                    Fecha de tarjeta
                  </label>
                  <div className="font-poppins w-full rounded-lg ms-2 outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] p-5">
                    <DatePicker
                      selected={form.startDate}
                      onChange={onChange}
                      startDate={form.startDate}
                      endDate={form.endDate}
                      locale={es}
                      selectsRange
                      inline
                    />
                    <div className="flex items-center">
                      <input
                        value={
                          form.startDate
                            ? form.startDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={handleStartDateChange}
                        className="font-poppins w-full p-2 rounded-xl outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]"
                        placeholder="Desde"
                      />
                      <input
                        value={
                          form.endDate
                            ? form.endDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={handleEndDateChange}
                        className="font-poppins w-full p-2 rounded-xl ms-2 outline-none bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:ring-2 focus:ring-[#6a5fff]"
                        placeholder="Hasta"
                      />
                    </div>
                    <label className="font-poppins block text-white text-sm mt-5 mb-2">
                      Crear recordatorio
                    </label>
                    <ReminderSelect />
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="flex-1 max-w-2xl">
                <div className="space-y-6">
                  {/* Task Title */}
                  <div className="flex flex-col w-full items-start gap-1.5 relative">
                    <label className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal]">
                      Título de la tarjeta
                    </label>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Ut enim ad minim veniam, quis nostrud"
                      className="w-full bg-[#ffffff0a] rounded-[10px] border border-solid border-[#3c3c3cb2] backdrop-blur-[1.8px]   [font-family:'Poppins',Helvetica] font-normal text-white placeholder-[#797676] text-sm tracking-[0] leading-[normal] px-2.5 py-[9px] outline-none h-auto focus:ring-1 focus:ring-[#6a5fff] focus:border-[#6a5fff]"
                    />
                  </div>

                  {/* Task Description */}
                  <div className="w-full flex flex-col items-start gap-1.5">
                    <label className="[font-family:'Poppins',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal]">
                      Descripción
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((prev: any) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
                      className="flex-1 w-full min-h-[130px] bg-[#ffffff0a] rounded-[10px] border border-solid border-[#3c3c3cb2]  p-2.5 [font-family:'Poppins',Helvetica] font-normal placeholder-[#797676] text-white text-sm tracking-[0] leading-[normal] outline-none resize-none focus:ring-1 focus:ring-[#6a5fff] focus:border-[#6a5fff]"
                    />
                  </div>

                  {/* User Assignments */}
                  <section>
                    <Responsible
                      boardId={boardIdNum}
                      members={form.assignees}
                      onDelete={handleDeleteResponsible}
                      onAdd={handleAddResponsible}
                    />
                  </section>

                  {/* Priority Section */}
                  <div>
                    <label className="font-poppins block text-white mb-2">
                      Prioridad
                    </label>
                    <select
                      onChange={(e) =>
                        setForm((prev: any) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      value={
                        form.priority === "Alta"
                          ? "high"
                          : form.priority === "Media"
                          ? "medium"
                          : form.priority === "Baja"
                          ? "low"
                          : form.priority === "high"
                          ? "high"
                          : form.priority === "medium"
                          ? "medium"
                          : form.priority === "low"
                          ? "low"
                          : ""
                      }
                      className="font-poppins w-full p-2 rounded-xl outline-none bg-[#ffffff0a] text-[#cac5c5] border border-[#3a3a3a] focus:ring-1 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200"
                    >
                      <option hidden>Agrega una prioridad...</option>
                      <option value="high" className="text-white bg-[#222222]">
                        Alta
                      </option>
                      <option
                        value="medium"
                        className="text-white bg-[#222222]"
                      >
                        Media
                      </option>
                      <option value="low" className="text-white bg-[#222222]">
                        Baja
                      </option>
                    </select>
                  </div>

                  {/* Status Section */}
                  <div>
                    <label className="font-poppins block text-white mb-2">
                      Estado
                    </label>
                    <select
                      onChange={(e) =>
                        setForm((prev: any) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      value={form.status}
                      className="font-poppins w-full p-2 rounded-xl outline-none bg-[#ffffff0a] text-[#cac5c5] border border-[#3a3a3a] focus:ring-1 focus:ring-[#6a5fff] focus:border-[#6a5fff] transition-all duration-200"
                    >
                      <option className="text-white" hidden>
                        Agrega un estado...
                      </option>
                      <option
                        className="text-white bg-[#222222]"
                        value="Pendiente"
                      >
                        Pendiente
                      </option>
                      <option
                        className="text-white bg-[#222222]"
                        value="En progreso"
                      >
                        En progreso
                      </option>
                      <option
                        className="text-white bg-[#222222]"
                        value="Completado"
                      >
                        Completado
                      </option>
                    </select>
                  </div>

                  {/* Tags Section */}
                  <div className="font-poppins mb-4">
                    <Tags
                      tags={form.tags.map((tag: any) => tag.name)}
                      onAdd={(newTag) =>
                        setForm((prev: any) => ({
                          ...prev,
                          tags: [...prev.tags, newTag],
                        }))
                      }
                      onDelete={handleDeleteTag}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <div className="flex w-[575px]">
                      <button
                        type="submit"
                        className="font-poppins flex-1 py-2 border border-[#6A5FFF] text-[#6A5FFF] rounded-xl hover:bg-[#5a4fef1b]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="font-poppins flex-1 ml-4 py-2 bg-[#6A5FFF] hover:bg-[#5A4FEF] text-white rounded-xl"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
