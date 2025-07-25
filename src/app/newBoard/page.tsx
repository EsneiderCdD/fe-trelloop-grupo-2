"use client";

import React from "react";
import { useState } from "react";
// import UserCard from "@/components/UserCard";
// import TagChip from "@/components/TagChip";


const NewBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  // const [members, setMembers] = useState("");
  // const [tags, setTags] = useState("");

  const [memberInput, setMemberInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [selectedMembers, setSelectedMembers] = useState<
    { name: string; username: string }[]
  >([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //constantes de prueba
  const existingUsers = [
    { name: "Nombre completo", username: "@usuario" },
    { name: "Juan Pérez", username: "@jperez" },
    { name: "Ana López", username: "@alopez" },
  ];

  const existingTags = ["Etiqueta", "Frontend", "Backend", "Urgente"];

  //lógica para la busqueda y filtración de miembros y etiquetas

  const filteredUsers = existingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(memberInput.toLowerCase()) ||
      user.username.toLowerCase().includes(memberInput.toLowerCase())
  );

  const filteredTags = existingTags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  const handleSelectMember = (user: { name: string; username: string }) => {
    if (!selectedMembers.some((m) => m.username === user.username)) {
      setSelectedMembers([...selectedMembers, user]);
      setMemberInput("");
    }
  };

  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validar que existan nombre y descripción:
    if (!name || !description) {
      setError("Por favor llena todos los campos.");
      return;
    }
    //si todo está bien, limpiar el error
    setError("");
    console.log("todo bien al 100");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="w-full bg-[#1A1A1A] text-white min-h-screen flex flex-col px-4">
        <h2 className="text-m font-semibold whitespace-nowrap p-2">
          Crear tablero
        </h2>

        <div className="flex justify-center items-center">
          <div className="min-h-screen w-1/2 text-white flex flex-col gap-4 relative overflow-visible">
            <div className="shrink-0">
              <img
                className="h-24 w-24 object-cover rounded-md"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Nombre de tablero</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe aquí..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe aquí..."
                className="h-16 px-4 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Miembros</label>
              <input
                type="text"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Buscar por nombre o @usuario..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {memberInput && (
                <ul className="absolute bg-[#2a2a2a] w-full mt-1 rounded-md z-10">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.username}
                      onClick={() => handleSelectMember(user)}
                      className="px-4 py-2 hover:bg-[#444] cursor-pointer flex items-center gap-2"
                    >
                      <span>👤</span>
                      <span>{user.name}</span>
                      <span className="text-gray-400">{user.username}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((m) => (
                  <div
                    key={m.username}
                    className="px-2 py-1 bg-[#333] rounded-full flex items-center gap-1 text-sm"
                  >
                    <span>👤</span>
                    {m.username}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block mb-1 text-sm">Etiquetas</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Escribe un nombre de etiqueta para crearla..."
                className="px-4 py-1 rounded-md bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {tagInput && (
                <ul className="absolute bg-[#2a2a2a] w-full mt-1 rounded-md z-10">
                  {filteredTags.map((tag) => (
                    <li
                      key={tag}
                      onClick={() => handleSelectTag(tag)}
                      className="px-4 py-2 hover:bg-[#444] cursor-pointer"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-1 bg-[#333] rounded-full text-sm"
                >
                  #{tag}
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                id="link-radio"
                type="radio"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Privado
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="link-radio"
                type="radio"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Público
              </label>
            </div>

            <div className="grid grid-cols-2 gap-x-6 pb-8">
              <button className="w-full bg-[#1a1a1a1a] hover:bg-[#1a1a1a] text-primary-600 py-1 border border-primary-600 rounded-md transition duration-200">
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
