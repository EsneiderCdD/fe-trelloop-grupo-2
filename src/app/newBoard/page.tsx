"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { TagChip } from "../../components/newBoard/TagChip";
import { UserBoard } from "../../components/newBoard/UserBoard";

import { createBoardController } from "controllers/boardController";
import { ValidationError } from "../../types/validatesError";

import { searchUsersController } from "controllers/userController";

import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";

const NewBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [boardImage, setBoardImage] = useState<File | null>(null);

  const router = useRouter();
  const goToHome = () => {
    router.push("/home");
  };

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [memberInput, setMemberInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [selectedMembers, setSelectedMembers] = useState<
    {
      id: number;
      name: string;
      last_name: string;
      email: string;
      avatar_url: string;
    }[]
  >([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [status, setStatus] = useState<"PRIVATE" | "PUBLIC">("PRIVATE");

  const [searchMember, setSearchMember] = useState("");
  const [results, setResults] = useState<
    Array<{
      id: number;
      name: string;
      last_name: string;
      email: string;
      avatar_url: string;
    }>
  >([]);

  //lógica para la busqueda y filtración de miembros y etiquetas

  const handleSearchInputChange = (query: string) => {
    setSearchMember(query);
    if (query.length < 2) {
      setResults([]); // Limpiar resultados si la query es muy corta
      return;
    }
  };

  const handleSearch = async (query: string) => {
    if (query.length < 2) return;

    try {
      const users = await searchUsersController(query);
      setResults(users);
    } catch (error) {
      console.error("❌ Error buscando miembros:", error);
      setResults([]);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Función para la selección de miembros
  const handleSelectMember = (member: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    avatar_url: string;
  }) => {
    // Verificar que no esté seleccionado
    if (!selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
      setSearchMember("");
      setResults([]);
    }
  };

  // Función para remover miembros
  const handleRemoveMember = (idToRemove: number) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== idToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);

    if (boardImage) {
      formData.append("image", boardImage);
    }

    selectedTags.forEach((tag) => formData.append("tags", tag));
    selectedMembers.forEach((m) => formData.append("members", m.id.toString()));

    try {
      await createBoardController(formData);
      router.push("/home");
    } catch (err) {
      if (err instanceof ValidationError) {
        setFormErrors({ [err.field || "general"]: err.message });
      } else {
        setFormErrors({ general: "Error inesperado" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="w-full bg-[#1A1A1A] text-white min-h-screen flex flex-col px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold whitespace-nowrap p-2 text-white">
            Crear tablero
          </h2>
          <button
            className="text-white bg-[#6A5FFF] rounded-[20px] w-[40px] h-[40px] flex justify-center items-center"
            onClick={goToHome}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Campos obligatorios (Nombre y descripción) y foto*/}
        <div className="flex justify-center items-center">
          <div className="min-h-screen w-1/2 text-white flex flex-col gap-4 relative overflow-visible">
            <label className="w-[130px] h-[130px] bg-[#1e1e1e] rounded-xl flex items-center justify-center hover:bg-[#2a2a2a] cursor-pointer">
              {boardImage ? (
                <img
                  src={URL.createObjectURL(boardImage)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <CameraIcon className="h-6 w-6 text-white" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setBoardImage(e.target.files?.[0] || null)}
              />
            </label>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Nombre de tablero</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe aquí..."
                className="px-4 py-1 rounded-md bg-[#1e1e1e] border placeholder-[#797676]  border-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-[#6a5fff]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe aquí..."
                className="h-16 px-4 rounded-md bg-[#1e1e1e] placeholder-[#797676] border  border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#6a5fff]"
              />
            </div>

            {/* Miembros */}
            <div>
              <div className="text-white text-sm font-[500] mt-[6px] mb-[4px]">
                Miembros
              </div>

              <div className="relative w-[575px]">
                <input
                  type="text"
                  placeholder="Buscar por nombre o @usuario..."
                  value={searchMember}
                  className="w-full h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 pr-10 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchMember(value);
                    
                    if (value.length >= 2) {
                      handleSearch(value);
                    } else {
                      setResults([]);
                    }
                  }}
                />



                {results.length > 0 && (
                  <ul className="absolute z-50 w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-md mt-1 max-h-40 overflow-y-auto">
                    {results.map((member) => (
                      <li
                        key={member.id}
                        className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-white border-b border-[#3a3a3a]"
                        onClick={() => handleSelectMember(member)}
                      >
                        {`${member.name} ${member.last_name}`}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>

              <div className="container-miembros flex flex-wrap mt-[5px] gap-x-2">
                {selectedMembers.map((member) => (
                  <UserBoard
                    key={member.id}
                    name={`${member.name} ${member.last_name}`}
                    username={member.email}
                    img={member.avatar_url}
                  />
                ))}
              </div>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Etiquetas</label>
              <div className="relative w-[575px]">
                <input
                  type="text"
                  placeholder="Escribe un nombre de etiqueta para crearla..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="w-full h-[41px] bg-[#1e1e1e] text-white placeholder-[#797676] rounded-[10px] px-4 pr-10 py-2 border border-[#3a3a3a] outline-none focus:ring-2 focus:ring-[#6a5fff] transition"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={handleAddTag}
                    className="size-6 cursor-pointer hover:stroke-[#6A5FFF] transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>

              <div className="tags mt-[8px] flex flex-wrap gap-x-2">
                {selectedTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-[#6A5FFF] text-white px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-white hover:text-red-200 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacidad */}
            <div className="visibility-container text-white text-xs mt-[80px] mb-[40px]">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  id="private"
                  value="PRIVATE"
                  checked={status === "PRIVATE"}
                  onChange={() => setStatus("PRIVATE")}
                  className="mr-[8px]"
                />
                <label htmlFor="private" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <div className="private-text-container ml-[8px] ">
                    <div className="private-text">Privado</div>
                    <div className="private-description">
                      (Solo tu y los miembros invitados pueden verlo)
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex items-center mt-[40px]">
                <input
                  type="radio"
                  name="visibility"
                  id="public"
                  value="PUBLIC"
                  checked={status === "PUBLIC"}
                  onChange={() => setStatus("PUBLIC")}
                  className="mr-[8px]"
                />
                <label htmlFor="public" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                    />
                  </svg>
                  <div className="public-text-container ml-[8px]">
                    <div className="public-text">Público</div>
                    <div className="public-description">
                      (Cualquier miembro del equipo puede acceder)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Botones crear y cancelar */}
            <div className="grid grid-cols-2 gap-x-6 pb-8">
              <button
                className="w-full bg-[#1a1a1a1a] hover:bg-[#1a1a1a] text-primary-600 py-1 border border-primary-600 rounded-md transition duration-200"
                onClick={goToHome}
              >
                Cancelar creación
              </button>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-1 rounded-md transition duration-200">
                Crear tablero
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewBoard;
